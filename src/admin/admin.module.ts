import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PendingActionSchema } from './admin.model';
import { DormModule } from 'src/dorm/dorm.module';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/schemas/users.schemas';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PendingAction', schema: PendingActionSchema },
    ]),
    DormModule,
    UsersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
