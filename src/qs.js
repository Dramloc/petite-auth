function stringify(query) {
	return Object.entries(query)
		.map(pair => pair.map(encodeURIComponent).join('='))
		.join('&');
}

function parse(qs) {
	return qs.substring(1)
		.split('&')
		.reduce((parsed, keyValue) => {
			const [key, value] = keyValue.split('=').map(decodeURIComponent);
			parsed[key] = value;
			return parsed;
		}, {});
}

export {
	stringify,
	parse
};
