import parseHash from '../parse-hash';

test('parseHash should return the parsed hash if valid', () => {
	const accessToken = 'bTpuxmdPJE5ylKKUWigcVVhBATfwoM_c';
	const expiresIn = '7200';
	const tokenType = 'Bearer';
	const state = 'BZdD~yXPu4_-ojTgbIaU03v2aKxIzIie';
	const idToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwibmlja25hbWUiOiJqb2huLmRvZSIsIm5hbWUiOiJKb2huIERvZSIsInBpY3R1cmUiOiJodHRwczovL2Zvby5iYXIuYmF6L3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDEtMzBUMTU6MTg6NDQuODcyWiIsImlzcyI6Imh0dHBzOi8vcGV0aXRlLWF1dGguYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTIzNDU2Nzg5IiwiYXVkIjoibkNlQ0xMM0RRNklqRERvdlYzMGNiZ3l5V1BkM2FrWjQiLCJpYXQiOjE1MTczMjU1MjQsImV4cCI6MTUxNzM2MTUyNCwiYXRfaGFzaCI6IktSTjZBbVlwNUlmTklQQndEMVBXSUEiLCJub25jZSI6IjQzTHZ2MXJHdnZIR0phbnM5ei0zRlpUSUF4Y1YwU3hJIn0.PDZlaJ6GrJD5M2gPyRleCUJxMOURZ19DPtCMBYCS0l0';
	location.hash = `#access_token=${accessToken}&expires_in=${expiresIn}&token_type=${tokenType}&state=${state}&id_token=${idToken}`;
	localStorage.setItem(state, state);
	expect(
		parseHash()
	).toEqual({
		access_token: accessToken,
		expires_in: expiresIn,
		token_type: tokenType,
		state,
		id_token: idToken
	});
	expect(localStorage.getItem).toHaveBeenLastCalledWith(state);
	expect(localStorage.removeItem).toHaveBeenLastCalledWith(state);
});

test('parseHash should throw if the stored state does not match', () => {
	const accessToken = 'bTpuxmdPJE5ylKKUWigcVVhBATfwoM_c';
	const expiresIn = '7200';
	const tokenType = 'Bearer';
	const state = 'BZdD~yXPu4_-ojTgbIaU03v2aKxIzIie';
	const idToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwibmlja25hbWUiOiJqb2huLmRvZSIsIm5hbWUiOiJKb2huIERvZSIsInBpY3R1cmUiOiJodHRwczovL2Zvby5iYXIuYmF6L3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDEtMzBUMTU6MTg6NDQuODcyWiIsImlzcyI6Imh0dHBzOi8vcGV0aXRlLWF1dGguYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTIzNDU2Nzg5IiwiYXVkIjoibkNlQ0xMM0RRNklqRERvdlYzMGNiZ3l5V1BkM2FrWjQiLCJpYXQiOjE1MTczMjU1MjQsImV4cCI6MTUxNzM2MTUyNCwiYXRfaGFzaCI6IktSTjZBbVlwNUlmTklQQndEMVBXSUEiLCJub25jZSI6IjQzTHZ2MXJHdnZIR0phbnM5ei0zRlpUSUF4Y1YwU3hJIn0.PDZlaJ6GrJD5M2gPyRleCUJxMOURZ19DPtCMBYCS0l0';
	location.hash = `#access_token=${accessToken}&expires_in=${expiresIn}&token_type=${tokenType}&state=${state}&id_token=${idToken}`;
	localStorage.setItem(state, 'invalid state');
	expect(parseHash).toThrowError('`state` does not match');
	expect(localStorage.getItem).toHaveBeenLastCalledWith(state);
	expect(localStorage.removeItem).toHaveBeenLastCalledWith(state);
});

test('parseHash should throw if there is no stored state', () => {
	const accessToken = 'bTpuxmdPJE5ylKKUWigcVVhBATfwoM_c';
	const expiresIn = '7200';
	const tokenType = 'Bearer';
	const state = 'BZdD~yXPu4_-ojTgbIaU03v2aKxIzIie';
	const idToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwibmlja25hbWUiOiJqb2huLmRvZSIsIm5hbWUiOiJKb2huIERvZSIsInBpY3R1cmUiOiJodHRwczovL2Zvby5iYXIuYmF6L3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDEtMzBUMTU6MTg6NDQuODcyWiIsImlzcyI6Imh0dHBzOi8vcGV0aXRlLWF1dGguYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTIzNDU2Nzg5IiwiYXVkIjoibkNlQ0xMM0RRNklqRERvdlYzMGNiZ3l5V1BkM2FrWjQiLCJpYXQiOjE1MTczMjU1MjQsImV4cCI6MTUxNzM2MTUyNCwiYXRfaGFzaCI6IktSTjZBbVlwNUlmTklQQndEMVBXSUEiLCJub25jZSI6IjQzTHZ2MXJHdnZIR0phbnM5ei0zRlpUSUF4Y1YwU3hJIn0.PDZlaJ6GrJD5M2gPyRleCUJxMOURZ19DPtCMBYCS0l0';
	location.hash = `#access_token=${accessToken}&expires_in=${expiresIn}&token_type=${tokenType}&state=${state}&id_token=${idToken}`;
	expect(parseHash).toThrowError('`state` does not match');
	expect(localStorage.getItem).toHaveBeenLastCalledWith(state);
	expect(localStorage.removeItem).toHaveBeenLastCalledWith(state);
});
