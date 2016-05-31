const goodReadsService = () => {

	var getBookById = (id, cb) => {
		cb(null, {description: 'our description'});

	};

	return {
		getBookById: getBookById
	};

};

module.exports = goodReadsService;