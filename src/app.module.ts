import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DormModule } from './Dorm/dorm.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
  	MongooseModule.forRoot(
    'mongodb://mongol:27017/DormLife',
  	),
    DormModule,
	AuthModule,
	UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
