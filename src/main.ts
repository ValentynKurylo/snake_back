import { NestFactory } from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
      .setTitle("Snake").setDescription("You can play game snake")
      .setVersion("1.0.0").addTag("Snake").build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/snake", app, document)

  await app.listen(5000, ()=>{
    console.log("Server started on port 5000 ")});
}
bootstrap();
