import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('Dragon Ball Tournament API')
    .setDescription('The Dragon Ball Tournament API description')
    .setVersion('1.0')
    .addTag('dragon-ball')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('❌ Error during bootstrap:', err);
});
