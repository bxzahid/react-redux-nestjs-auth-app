import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentType } from '@typegoose/typegoose';
import { Auth } from '../common/decorators/auth.decorator';
import { Session } from './schemas/session.schema';
import { SessionsService } from './sessions.service';

@ApiTags('Session')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @Auth()
  findAll(): Promise<DocumentType<Session>[]> {
    return this.sessionsService.findAll();
  }
}
