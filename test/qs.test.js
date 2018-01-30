import { stringify, parse } from '../src/qs';

test('qs.stringify returns encoded parameters', () => {
	expect(
		stringify({
			client_id: '123456789-abcdef.apps.googleusercontent.com',
			redirect_uri: 'https://foo.bar/callback',
			response_type: 'token id_token',
			scope: 'openid profile',
			state: '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~',
			nonce: '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~'
		})
	).toBe('client_id=123456789-abcdef.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Ffoo.bar%2Fcallback&response_type=token%20id_token&scope=openid%20profile&state=0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~&nonce=0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~');
});

test('qs.parse returns parsed hash parameters', () => {
	expect(
		parse('#id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ&access_token=jZdhD5czMT33JV80zHvtu1xSrnkA5ud1&state=0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~')
	).toEqual({
		id_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
		access_token: 'jZdhD5czMT33JV80zHvtu1xSrnkA5ud1',
		state: '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~'
	});
});
