export function randomCryptoString() {
	const keyLength = 32;
	const generator = window.crypto || window.msCrypto;
	const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
	const charsetLength = 65;
	const random = generator.getRandomValues(new Uint8Array(keyLength));
	let result = '';
	for (let i = 0; i < keyLength; ++i) {
		result += charset[random[i] % charsetLength];
	}
	return result;
}
