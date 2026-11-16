import { MeSchema } from '@app/contracts';
import { createZodDto } from 'nestjs-zod';

export class MeDto extends createZodDto(MeSchema) {}
