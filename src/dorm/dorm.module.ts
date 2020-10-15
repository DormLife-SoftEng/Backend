import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { DormController } from './dorm.controller';
import { DormService } from './dorm.service';
import { DormSchema, RoomSchema, utilSchema } from './dorm.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Dorm', schema: DormSchema }]),
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: 'Utility', schema: utilSchema }]),
  ],
  controllers: [DormController],
  providers: [DormService],
})
export class DormModule {}
