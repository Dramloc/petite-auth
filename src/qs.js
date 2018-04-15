export function stringify(params) {
	return Object.keys(params)
		.map(key => [key, params[key]].map(encodeURIComponent).join('='))
		.join('&');
}

export function parse(queryString) {
	return queryString.substring(1)
		.split('&')
		.reduce((params, keyValue) => {
			const [key, value] = keyValue.split('=').map(decodeURIComponent);
			params[key] = value;
			return params;
		}, {});
}
