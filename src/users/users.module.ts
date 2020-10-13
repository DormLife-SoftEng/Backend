import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/users.schemas';
import {UserRepository} from './repositories/user.repository';
import { UsersController } from './users.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: "User", schema: UserSchema
			}
		])
	],
	providers: [UsersService, UserRepository],
	controllers: [UsersController],
	exports: [UsersService, UserRepository],
})
export class UsersModule {}
