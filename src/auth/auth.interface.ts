export interface jwtPayload {
	userId: string;
	name: {
		firstName: string;
		lastName: string;
	}
	avatar: number;
	role: string;
	token_type: string;
}

export interface jwtToken {
	access_token: string
	refresh_token: string
}

