export interface jwtPayload {
	userId: string;
	name: {
		firstName: string;
		lastName: string;
	}
	avatar: string;
	role: string;
}

export interface accessToken {
	access_token: string
}
