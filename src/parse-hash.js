import namespace from './namespace';
import { parse } from './qs';

function parseHash() {
	const parsedHash = parse(location.hash);
	const { state } = parsedHash;
	const storedState = localStorage.getItem(namespace + state);
	localStorage.removeItem(namespace + state);
	if (state && storedState !== state) {
		throw new Error('`state` does not match');
	}
	return parsedHash;
}

export default parseHash;
