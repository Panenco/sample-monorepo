---
paths:
  - 'apps/api/**/*'
---

# API (NestJS + Prisma + Zod)

## Where things go

One folder per feature: `apps/api/src/domains/<feature>/`, with

- `<feature>.module.ts`, registered in `imports` of `apps/api/src/app.module.ts`
- `<feature>.controller.ts`, the routes
- `<feature>.dto.ts`, thin DTO classes around the contract schemas

`domains/me/` is the example to copy. Shared setup lives outside `domains/`: `auth/`, `prisma/`, `env.ts`, `configure-app.ts`.

## Validation and responses

- Request and response shapes are Zod schemas in `packages/contracts` (see `general.md`). The DTO only wraps one: `export class CreatePatientDto extends createZodDto(CreatePatientSchema) {}`, used as `@Body() body: CreatePatientDto`.
- No `class-validator` or `class-transformer`. `ZodValidationPipe` in `app.module.ts` validates every body, query and param.
- Numbers from the query string: `z.coerce.number()`.
- Every JSON route has `@ZodResponse({ type: SomeDto })`, and every controller has `@ApiTags('<feature>')`. They define the OpenAPI spec the website's SDK is generated from.
- After adding or changing a route, run `pnpm generate:sdk`.

## Errors and logging

- Throw Nest's HTTP exceptions (`NotFoundException`, `ConflictException`, `ForbiddenException`, ...) with a message a user can understand. Log the technical detail on the server.
- Use `Logger` from `@nestjs/common`, not `console`.

## Database (Prisma)

- Inject `PrismaService` in the constructor and use its models (`this.prisma.patient.findMany(...)`).
- No raw SQL.
- Change the schema in `apps/api/prisma/schema.prisma`, then run `pnpm db:migration --name <what-changed>`. Never write or edit migration SQL by hand.
- `prisma/seed.ts` must be safe to run again and again: check before you create.

## Login

Every route that returns user data needs a logged-in user. See `auth.md`.
