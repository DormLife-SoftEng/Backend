import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LobbyController } from './lobby.controller';
import { LobbyService } from './lobby.service';
import { LobbySchema } from './lobby.model';
<<<<<<< HEAD
import { DormModule } from 'src/dorm/dorm.module';
=======
import { DormModule } from 'src/Dorm/dorm.module';
>>>>>>> finishing get post lobby
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
