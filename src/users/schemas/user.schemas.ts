import {Prop, Schema, SchemaFactory, raw} from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import {HexBase64BinaryEncoding} from 'crypto';
export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop(raw({
		firstName: {type: String},
		lastName: {type: String}
	}))
	name: Record<string, any>;

	@Prop()
	telephone: string;

	@Prop({required: true})
	natid: string;

	@Prop(raw({
		email: {type: String},
		verified: {type: Boolean}
	}))
	emailInfo: Record<string, any>;

	@Prop()
	sex: string;

	@Prop()
	hashedPassword: string;

	@Prop()
	userType: string;

	@Prop()
	PictureProfile: string;

	@Prop()
	refreshToken: string;

	@Prop(Date)
	createdOn: string;

	@Prop(Date)
	modifiedOn: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
