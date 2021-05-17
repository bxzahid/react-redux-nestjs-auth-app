import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Session } from './sessions/schemas/session.schema';
import { SessionsModule } from './sessions/sessions.module';
import { User } from './users/schemas/user.schema';
import { UsersModule } from './users/users.module';

const config: ConfigService = new ConfigService();

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Session]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypegooseModule.forRoot(config.get<string>('DATABASE_URL'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    UsersModule,
    SessionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
