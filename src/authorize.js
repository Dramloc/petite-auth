import namespace from './namespace';
import { stringify } from './qs';

function generateState(length) {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
  const generator = crypto || msCrypto;
  return Array.from(generator.getRandomValues(new Uint8Array(length)))
    .map(random => charset[random % charset.length])
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
  options.state = generateState(32);
  options.nonce = generateState(32);
  localStorage.setItem(namespace + options.state, options.state);
  location.href = `${url}?${stringify(options)}`;
}

export default authorize;
