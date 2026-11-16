import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Me } from '@app/contracts';
import { ZodResponse } from 'nestjs-zod';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
import { MeDto } from './me.dto';

@ApiTags('me')
@Controller('me')
@UseGuards(AuthGuard)
export class MeController {
  @Get()
  @ZodResponse({ type: MeDto })
  getMe(@CurrentUser() user: CurrentUser): Me {
    return { id: user.id, name: user.name, email: user.email };
  }
}
