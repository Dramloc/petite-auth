const cryptoMock = (() => {
	function getRandomValues(typedArray) {
		typedArray.fill(0);
		return typedArray;
	}

	return {
		getRandomValues
	};
})();

Object.defineProperty(window, 'crypto', {
	value: cryptoMock
});
