import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/users.schemas';
import {UserRepository} from './repositories/user.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: "User", schema: UserSchema
			}
		])
	],
	providers: [UsersService, UserRepository]
})
export class UsersModule {}
