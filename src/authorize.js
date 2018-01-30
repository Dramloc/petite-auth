import { stringify } from './qs';

function randomCryptoString() {
	const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
	return Array.from(crypto.getRandomValues(new Uint8Array(32)), random => charset[random % 65])
		.join('');
}

/**
 * @param {string} url - OAuth2 provider `authorize` endpoint
 * @param {Object} options - OAuth2 authorization options
 * @param {string} options.client_id - OAuth2 client id
 * @param {string} options.response_type - OAuth2 implicit flow response type (can be 'id_token', 'token' or both)
 * @param {string} options.redirect_uri - Your application callback endpoint
 * @param {string} options.scope - OAuth2 requested scopes
 */
function authorize(url, options) {
	options.state = randomCryptoString();
	options.nonce = randomCryptoString();
	localStorage.setItem(options.state, options.state);
	location.assign(`${url}?${stringify(options)}`);
}

export default authorize;
