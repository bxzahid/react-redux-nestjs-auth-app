import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { CastErrorExceptionFilter } from './common/filters/cast-error.filter';
import { ValidationErrorExceptionFilter } from './common/filters/validation-error.filter';
import { AppValidationPipe } from './utils/appValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new AppValidationPipe());
  app.useGlobalFilters(new ValidationErrorExceptionFilter());
  app.useGlobalFilters(new CastErrorExceptionFilter());

  app.use(compression());
  app.use(helmet());

  const configService = app.get(ConfigService);

  const appName = configService.get<string>('APP_NAME');
  const appDescription = configService.get<string>('APP_DESCRIPTION');
  const appVersion = configService.get<string>('APP_VERSION');
  const port = configService.get<string>('APP_PORT');

  app.enableCors({
    credentials: true,
    origin: configService
      .get<string>('CLIENT_URL')
      .split(',')
      .map((url) => url.trim()),
  });

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDescription)
    .setVersion(appVersion)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || port);

  console.log(`\nApplication is running on: ${await app.getUrl()}`);
}
bootstrap();
