function stringify(query) {
	return Object.entries(query)
		.map(pair => pair.map(encodeURIComponent).join('='))
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
