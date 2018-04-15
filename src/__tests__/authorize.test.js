import authorize from '../authorize';

test('authorize should redirect user to authorize endpoint', () => {
	const authorizeUrl = 'https://oauth2.endpoint/authorize';
	const clientId = 'the-oauth2-client-id';
	const redirectUri = 'https://callback.url/callback';
	const responseType = 'token id_token';
	const scope = 'openid profile';
	authorize(authorizeUrl, {
		client_id: clientId,
		response_type: responseType,
		redirect_uri: redirectUri,
		scope
	});
	const state = '00000000000000000000000000000000';
	const nonce = '00000000000000000000000000000000';
	expect(localStorage.setItem).toHaveBeenLastCalledWith(state, state);
	expect(location.assign).toBeCalledWith(`${authorizeUrl}?client_id=${clientId}&response_type=${encodeURIComponent(responseType)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}&nonce=${nonce}`);
});
