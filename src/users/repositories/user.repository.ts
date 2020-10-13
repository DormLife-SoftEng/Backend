import {Injectable} from "@nestjs/common";
import {User, UserDocument} from "../schemas/users.schemas";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class UserRepository {

	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const createdUser = new this.userModel (createUserDto);
		return createdUser.save()
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async findByEmail(emailQuery: string): Promise<User> {
		return this.userModel.findOne({emailInfo: {email: emailQuery}}).exec();
	}

	async findById(userId: string): Promise<User> {
		return this.userModel.findById(userId).exec();
	}
}
