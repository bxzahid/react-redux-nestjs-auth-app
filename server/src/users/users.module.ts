import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SessionsModule } from '../sessions/sessions.module';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [TypegooseModule.forFeature([User]), SessionsModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
