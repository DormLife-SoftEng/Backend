import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LobbyController } from './lobby.controller';
import { LobbyService } from './lobby.service';
import { LobbySchema } from './lobby.model';
import { DormModule } from 'src/dorm/dorm.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lobby', schema: LobbySchema }]),
    DormModule,
    UsersModule
  ],
  controllers: [LobbyController],
  providers: [LobbyService],
})
export class LobbyModule {}
