import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {
		FastifyAdapter,
		NestFastifyApplication
} from '@nestjs/platform-fastify';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
		 	AppModule,
  			new FastifyAdapter({logger: true}));

  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
  	.setTitle('API Example')
	.setDescription('DormLife API description')
	.setVersion('1.0')
	.setBasePath('api/v1')
	.build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalPipes( new ValidationPipe() );
  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
