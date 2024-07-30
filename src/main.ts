import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import ValidationExceptionFilter from './validation-rule/filters/validation-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port);
}
bootstrap();
