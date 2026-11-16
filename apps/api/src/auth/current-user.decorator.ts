import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { AuthenticatedRequest, SessionUser } from './auth';

// Gives a route handler the logged-in user: `@CurrentUser() user: CurrentUser`. Needs AuthGuard.
export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<AuthenticatedRequest>().user;
});

export type CurrentUser = SessionUser;
