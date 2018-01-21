import namespace from './namespace';
import { parse } from './qs';

function validateParsedHash({ state }) {
  const storedState = localStorage.getItem(namespace + state);
  localStorage.removeItem(namespace + state);
  if (state && storedState !== state) {
    throw new Error('`state` does not match');
  }
}

function parseHash() {
  const parsedHash = parse(location.hash);
  validateParsedHash(parsedHash);
  return parsedHash;
}

export default parseHash;
