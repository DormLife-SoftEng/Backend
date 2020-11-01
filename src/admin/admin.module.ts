import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PendingActionSchema } from './admin.model';
import {DormModule} from 'src/dorm/dorm.module';
import {UsersModule} from 'src/users/users.module';

@Module({
  imports: [ 
    forwardRef(() => UsersModule),
    forwardRef( () => DormModule),
    MongooseModule.forFeature([{name: 'PendingAction', schema: PendingActionSchema}])
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, MongooseModule.forFeature([{name: 'PendingAction', schema: PendingActionSchema}])]
})
export class AdminModule {}
