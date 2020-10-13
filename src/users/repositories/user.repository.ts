import {Injectable} from "@nestjs/common";
import {User, UserDocument} from "../schemas/users.schemas";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateUserDto} from "../dto/create-user.dto";
import {UserParsedDto} from "../users.interface";

@Injectable()
export class UserRepository {

	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(createUserDto: UserParsedDto): Promise<UserDocument> {
		// Parsing
		createUserDto.createdOn = new Date().toString();
		const createdUser = new this.userModel (createUserDto);
		return createdUser.save()
	}

	async findAll(): Promise<UserDocument[]> {
		return this.userModel.find().exec();
	}

	async findByEmail(emailQuery: string): Promise<UserDocument> {
		return this.userModel.findOne({email: emailQuery}).exec();
	}

	async findById(userId: string): Promise<UserDocument> {
		return this.userModel.findById(userId).exec();
	}
}
