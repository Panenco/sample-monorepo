---
name: create-api-endpoint
description: Add or change an API endpoint end to end: contract schema, database model and migration, NestJS controller and DTO, journey test, and the regenerated SDK for the website. Use when the user wants the API to store, return or change data ("save notes", "list notes", "add an endpoint").
argument-hint: <what the endpoint should do>
---

# Add an API endpoint

Conventions are in `.claude/rules/api.md`, `auth.md` and `testing.md`. Follow them; this is the order of work. `apps/api/src/domains/me/` is the smallest working example.

## 1. Contract

In `packages/contracts/src/<feature>.schemas.ts`:

- the response shape (what the API returns)
- the request shape for create or update, with `z.strictObject`

Then export the file from `packages/contracts/src/index.ts` (`export * from './<feature>.schemas.js';`, `.js` included).

## 2. Database (if new data is stored)

1. Add or change the model in `apps/api/prisma/schema.prisma`. Link it to the user who owns it when that applies (`userId` plus a relation to `User`).
2. Run `pnpm db:migration --name <what-changed>`. It creates the migration and updates the Prisma client.

## 3. Feature folder

In `apps/api/src/domains/<feature>/`:

```ts
// <feature>.dto.ts
export class NoteDto extends createZodDto(NoteSchema) {}
export class CreateNoteDto extends createZodDto(CreateNoteSchema) {}

// <feature>.controller.ts
@ApiTags('notes')
@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ZodResponse({ type: [NoteDto] })
  list(@CurrentUser() user: CurrentUser) {
    return this.prisma.note.findMany({ where: { userId: user.id } });
  }

  @Post()
  @ZodResponse({ status: 201, type: NoteDto })
  create(@CurrentUser() user: CurrentUser, @Body() body: CreateNoteDto) {
    return this.prisma.note.create({ data: { ...body, userId: user.id } });
  }
}

// <feature>.module.ts
@Module({ controllers: [NotesController] })
export class NotesModule {}
```

Add the module to `imports` in `apps/api/src/app.module.ts`.

When a controller method grows past about 30 lines, move the logic into a `<feature>.service.ts` (an `@Injectable()` class listed in the module's `providers`).

## 4. Test

Add or extend `apps/api/test/<feature>.e2e.test.ts`, copying the setup from `me.e2e.test.ts`. Write a journey: log in, create, list, check the result. Then check that a request without a session gets 401.

## 5. Make it available to the website

1. `pnpm generate:sdk`: the website now has a typed function for each route (for example `notesControllerList`). Check the name in `packages/api-sdk/src/generated/sdk.gen.ts`.
2. `pnpm lint`, `pnpm typecheck` and `pnpm test` pass.
3. The endpoint shows up in the API docs at http://localhost:3001/api/docs.

Next: show it on a page with the `create-nextjs-page` skill.
