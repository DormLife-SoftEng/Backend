import {Injectable} from "@nestjs/common";
import {User, UserDocument} from "../schemas/users.schemas";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateUserDto} from "../dto/create-user.dto";
import {UserParsedDto} from "../users.interface";

@Injectable()
export class UserRepository {

	constructor(@InjectModel("User") private readonly userModel: Model<UserDocument>) {}

	async create(createUserDto: UserParsedDto): Promise<UserDocument> {
		// Parsing
		createUserDto.createdOn = new Date().toString();
		createUserDto.PictureProfile = Math.floor( Math.random() * 3 );
		const createdUser = new this.userModel(createUserDto);
		return createdUser.save()
	}

	async findByEmail(emailQuery: string): Promise<UserDocument> {
		return this.userModel.findOne({email: emailQuery});
	}

	async findById(userId: string): Promise<UserDocument> {
		return this.userModel.findById(userId)
	}
}
