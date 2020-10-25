import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {
		FastifyAdapter,
		NestFastifyApplication
} from '@nestjs/platform-fastify';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as FastifyFormBody from 'fastify-formbody';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
		 	AppModule,
  			new FastifyAdapter({logger: true}),
			{bodyParser: false},
 			);

  app.setGlobalPrefix('api/v1');
  app.register(FastifyFormBody as any);
  app.enableCors();
  const options = new DocumentBuilder()
  	.setTitle('API Example')
	.setDescription('DormLife API description')
	.setVersion('1.0')
	.setBasePath('api/v1')
	.addServer('http://localhost:5000')
	.addOAuth2(
	  {
		type: 'oauth2',
		flows: {
		  password: {
		  	authorizationUrl: 'api/v1/oauth/verify-token',
			tokenUrl: 'api/v1/oauth/sign-in',
			refreshUrl: 'api/v1/oauth/refresh-token',
			scopes: [],
		  }
		},
		description: 'OpenAuth2',
	  }
	)
	.build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalPipes( new ValidationPipe() );
  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
