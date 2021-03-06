import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(
		 	AppModule,
 			);

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  const options = new DocumentBuilder()
      .setTitle('API Example')
	.setDescription('DormLife API description')
	.setVersion('1.0')
	.setBasePath('/v1')
	// .addServer('http://0.0.0.0:5000')
	.addOAuth2(
	  {
		type: 'oauth2',
		flows: {
		  password: {
			  authorizationUrl: 'http://localhost:5000/api/v1/oauth/verify-token',
			tokenUrl: 'http://localhost:5000/api/v1/oauth/sign-in',
			refreshUrl: 'http://localhost:5000/api/v1/oauth/refresh-token',
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
