export interface UserParsedDto {
	name: {
		firstName: string;
		lastName: string;
	}

	telephone: string;

	email: string;

	email_verified: boolean;

	sex: string;

	hashedPassword: string;

	PictureProfile: number;

	refreshToken: string;

	createdOn: string;

	modifiedOn: string;

	natId: string;

	userType: string;
}

export interface UserRegisterRes {
	userId: string;
}

export interface generalUserInfo {
	userId: string;

	name: {
		firstName: string;
		lastName: string;
	}

	telephone: string;

	email: string;

	email_verified: boolean;

	PictureProfile: number;

	sex: string;

	createdOn: string;

	userType: string;
}
