import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from 'src/users/users.module';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants';
import {JwtStrategy} from './strategies/jwt.strategy';
import {UsersService} from 'src/users/users.service';
import {DormModule} from 'src/dorm/dorm.module';

@Module({
	imports: [
		UsersModule,
		PassportModule.register({
				defaultStrategy: 'jwt',
				property: 'user',
				session: false,
		}),
		JwtModule.register({}),
	],
	providers: [
			AuthService,
		   	LocalStrategy,
		   	JwtStrategy,
		   	UsersService,],
	controllers: [AuthController],
})
export class AuthModule {}
