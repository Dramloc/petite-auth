declare namespace petiteauth {
	interface ParsedHash {
		access_token?: string;
		id_token?: string;
		expires_in?: string;
		token_type?: string;
		state: string;
	};

	interface AuthorizeOptions {
		client_id: string;
		response_type: string;
		redirect_uri: string;
		scope: string;
	}

	declare function authorize(url: string, options: AuthorizeOptions): void;
	declare function parseHash(): ParsedHash;
}

export = petiteauth;
