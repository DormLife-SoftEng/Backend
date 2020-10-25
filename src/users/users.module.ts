import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schemas';
import { UserRepository } from './repositories/user.repository';
import { UsersController } from './users.controller';
import { DormModule } from 'src/dorm/dorm.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [
    UsersService,
	  UserRepository,
	  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class UsersModule {}
