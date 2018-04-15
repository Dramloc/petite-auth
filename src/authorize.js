import { stringify } from './qs';
import { randomCryptoString } from './random-crypto-string';

/**
 * @param {string} url - OAuth2 provider `authorize` endpoint
 * @param {Object} options - OAuth2 authorization options
 * @param {string} options.client_id - OAuth2 client id
 * @param {string} options.response_type - OAuth2 implicit flow response type (can be 'id_token', 'token' or both)
 * @param {string} options.redirect_uri - Your application callback endpoint
 * @param {string} options.scope - OAuth2 requested scopes
 */
export default function authorize(url, options) {
	options.state = randomCryptoString();
	options.nonce = randomCryptoString();
	localStorage.setItem(options.state, options.state);
	location.assign(`${url}?${stringify(options)}`);
}
