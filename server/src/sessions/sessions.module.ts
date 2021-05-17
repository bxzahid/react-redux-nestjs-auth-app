import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { Session } from './schemas/session.schema';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

const config: ConfigService = new ConfigService();

@Module({
  imports: [
    TypegooseModule.forFeature([Session]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: config.get('JWT_SECRET'),
    }),
  ],
  providers: [SessionsService],
  controllers: [SessionsController],
  exports: [SessionsService],
})
export class SessionsModule {}
