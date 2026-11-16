import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AUTH, createAuth } from './auth';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
  controllers: [AuthController],
  providers: [{ provide: AUTH, useFactory: createAuth, inject: [PrismaService] }, AuthGuard],
  exports: [AUTH, AuthGuard],
})
export class AuthModule {}
