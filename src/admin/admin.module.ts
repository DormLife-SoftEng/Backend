import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PendingActionSchema } from './admin.model';
import {DormModule} from 'src/dorm/dorm.module';
import {UsersModule} from 'src/users/users.module';

@Module({
  imports: [
	DormModule,
	UsersModule,
    MongooseModule.forFeature([{ name: 'PendingAction', schema: PendingActionSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
