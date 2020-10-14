import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PendingActionSchema } from './admin.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PendingAction', schema: PendingActionSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}