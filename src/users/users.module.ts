import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/users.schemas';
import {UserRepository} from './repositories/user.repository';
import { UsersController } from './users.controller';
import { DormService } from '../dorm/dorm.service';
import {DormModule} from 'src/dorm/dorm.module';
@Module({
	imports: [
		DormModule,
		MongooseModule.forFeature([
			{
				name: "User", schema: UserSchema
			}
		]),
	],
	providers: [UsersService, UserRepository],
	controllers: [UsersController],
	exports: [UsersService, UserRepository],
})
export class UsersModule {}
