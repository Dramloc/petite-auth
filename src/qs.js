function stringify(query) {
	return Object.keys(query)
		.map(key => `${key}=${encodeURIComponent(query[key])}`)
		.join('&');
}

function parse(qs) {
	qs = qs.replace(/^#?\/?/, '');
	return qs.split('&').reduce((parsed, keyValue) => {
		const [key, value] = keyValue.split('=');
		parsed[key] = decodeURIComponent(value);
		return parsed;
	}, {});
}

export {
	stringify,
	parse
};
