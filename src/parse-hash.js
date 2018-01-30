import { parse } from './qs';

function parseHash() {
	const parsedHash = parse(location.hash);
	const { state } = parsedHash;
	const storedState = localStorage.getItem(state);
	localStorage.removeItem(state);
	if (state && storedState !== state) {
		throw '`state` does not match';
	}
	return parsedHash;
}

export default parseHash;
