export interface jwtPayload {
	userId: string;
	name: {
		firstName: string;
		lastName: string;
	}
	avatar: string;
	role: string;
}

export interface jwtToken {
	access_token: string
	refresh_token: string
}

