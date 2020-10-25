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

	@Prop()
	natId: string;

	@Prop({ required: true, unique: true, index: true})
	email: string;

	@Prop({required: true})
	email_verified: boolean;

	@Prop({required: true})
	sex: string;

	@Prop({required: true})
	hashedPassword: string;

	@Prop({required: true})
	userType: string;

	@Prop({required: true, default: 'profile1'})
	PictureProfile: string;

	@Prop()
	refreshToken: string;

	@Prop({timestamps: true, required:true})
	createdOn: string;

	@Prop({timestamps: true})
	modifiedOn: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
