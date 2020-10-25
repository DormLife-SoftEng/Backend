import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DormController } from './dorm.controller';
import { DormService } from './dorm.service';
import { DormSchema, RoomSchema, utilSchema } from './dorm.model';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/repositories/user.repository';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
  	MongooseModule.forFeature([{ name: 'Dorm', schema: DormSchema }]),
    MongooseModule.forFeature([{ name: 'Utility', schema: utilSchema }]),
  ],
  controllers: [DormController],
  providers: [DormService],
  exports: [
    DormService,
    MongooseModule.forFeature([{ name: 'Dorm', schema: DormSchema }]),],
})
export class DormModule {}
