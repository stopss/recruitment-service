import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  // swagger 세팅
  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('채용 공고 API')
    .setVersion('1.0.0')
    .addTag('swagger')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`server start port: ${port}`);
}
bootstrap();
