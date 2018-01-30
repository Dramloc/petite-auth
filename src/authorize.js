import namespace from './namespace';
import { stringify } from './qs';

function randomCryptoString() {
	const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
	return Array.from(crypto.getRandomValues(new Uint8Array(32)), random => charset[random % 65])
		.join('');
}

/**
 * @param {string} url - OAuth2 provider `authorize` url
 * @param {Object} options - OAuth2 authorization options.
 * @param {string} options.client_id -
 * @param {string} options.response_type -
 * @param {string} options.redirect_uri -
 * @param {string} options.scope -
 */
function authorize(url, options) {
	options.state = randomCryptoString();
	options.nonce = randomCryptoString();
	localStorage.setItem(namespace + options.state, options.state);
	location.href = `${url}?${stringify(options)}`;
}

export default authorize;
