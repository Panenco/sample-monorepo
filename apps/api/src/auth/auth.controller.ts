import { All, Controller, Inject, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { toNodeHandler } from 'better-auth/node';
import type { Request, Response } from 'express';
import { AUTH, type Auth } from './auth';

// Hands every /api/auth/* request (sign-in, sign-out, get-session, ...) to better-auth.
@ApiExcludeController()
@Controller('auth')
export class AuthController {
  private readonly handler: ReturnType<typeof toNodeHandler>;

  constructor(@Inject(AUTH) auth: Auth) {
    this.handler = toNodeHandler(auth);
  }

  @All('*splat')
  handle(@Req() req: Request, @Res() res: Response) {
    return this.handler(req, res);
  }
}
