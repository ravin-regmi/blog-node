const express = require('express');
const router = express.Router();
const fs = require('fs');

const filename = 'public/storage/posts.json';

router.get('/', function (req, res, next) {
	getPosts(cb);
	function cb(response) {
		res.send(response);
	}
});

router.post('/', function (req, res) {
	// console.log('req params (to get GET data) = ', req.params);
	// console.log('req body (to get POST data) = ', req.body);
	savePosts(JSON.stringify(req.body), cb);
	function cb(response) {
		res.send(response);
	}
});


/*
data storage operations
*/

function getPosts(cb) {
	let fileContent = null;
	fs.readFile(filename, {encoding: 'utf8'}, (err, data) => {
		if (err) {
			console.log('error opening posts file', err);
		}
		fileContent = data;
		cb(fileContent);
	});
}

function savePosts(data, cb) {
	console.log('save post data = ', data)
	fs.writeFile(filename, data, function(err, data) {
		let status = false;
		if (err) {
			console.log('error writing into posts.json file', err);
		}
		status = true;
		cb({status: status});
	});
}

/*
END
*/



module.exports = router;