const express = require('express');
const router = express.Router();
const fs = require('fs');

const filename = 'public/storage/comments.json';

router.get('/', function(req, res, next) {
	const file = fs.readFileSync(filename);
	res.send(file.toString());
});

router.post('/', function (req, res) {
	// console.log('req params (to get GET data) = ', req.params);
	// console.log('req body (to get POST data) = ', req.body);
	saveComments(JSON.stringify(req.body), cb);
	function cb(response) {
		res.send(response);
	}
});

/*
data storage operations
*/

function saveComments(data, cb) {
	console.log('save post data = ', data)
	fs.writeFile(filename, data, function(err, data) {
		let status = false;
		if (err) {
			console.log('error writing into comments.json file', err);
		}
		status = true;
		cb({status: status});
	});
}

/*
END
*/

module.exports = router;