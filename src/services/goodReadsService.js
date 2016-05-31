
const http = require('http');
const xml2js = require('xml2js');
const parser = xml2js.Parser({explicitArray: false});


const goodReadsService = () => {

	var getBookById = (id, cb) => {

		var options = {
			host: 'www.goodreads.com',
			path: '/book/show/'+id+'?format=xml&key=276hVIls8qy3OV8qivy2g'
		};
		var callBackFunction = (response) => {
			var str = '';

			response.on('data', (chunk) => {
				str += chunk;
			});
			response.on('end', () => {
				console.log('str>>>>', str);
				parser.parseString(str,
					(err, result) => {
						cb(null, result.GoodreadsResponse.book);
				});
			});
		};
		
		http.request(options, callBackFunction).end();

	};
	return {
		getBookById: getBookById
	};

};

module.exports = goodReadsService;