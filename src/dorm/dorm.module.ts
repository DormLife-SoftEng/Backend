import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DormController } from './dorm.controller';
import { DormService } from './dorm.service';
import { DormSchema, RoomSchema, utilSchema } from './dorm.model';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/repositories/user.repository';
import { DormRepository } from './repositories/dorm.repository';
import { AdminModule } from 'src/admin/admin.module';
import { PendingActionSchema } from 'src/admin/admin.model';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    AdminModule,
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
  	MongooseModule.forFeature([{ name: 'Dorm', schema: DormSchema }]),
    MongooseModule.forFeature([{ name: 'Utility', schema: utilSchema }]),
  ],
  controllers: [DormController],
  providers: [DormService, DormRepository],
  exports: [
    DormService,
    DormRepository,
    MongooseModule.forFeature([{ name: 'Dorm', schema: DormSchema }]),],
})
export class DormModule {}
