import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DormModule } from './Dorm/dorm.module';

@Module({
  imports: [
  	MongooseModule.forRoot(
  		'MONGO_URI',
    ),
    DormModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
