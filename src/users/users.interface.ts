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

	PicProf: string;

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
	name: {
		firstName: string;
		lastName: string;
	}

	telelphone: string;

	email: string;

	email_verified: boolean;

	sex: string;

	createdOn: string;

	modifiedOn: string;

	userType: string;
}
