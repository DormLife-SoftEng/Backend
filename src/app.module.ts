import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { DormModule } from './dorm/dorm.module';
import { ReviewModule } from './review/review.module';
import { AdminModule } from './admin/admin.module';
import { LobbyModule } from './lobby/lobby.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongol:27017/DormLife'),
    AuthModule,
    UsersModule,
    DormModule,
    ReviewModule,
    AdminModule,
    LobbyModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
