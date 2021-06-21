import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Metaphor')
    .setDescription("let's talk")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}
bootstrap();
