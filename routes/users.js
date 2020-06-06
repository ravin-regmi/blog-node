var express = require('express');
var router = express.Router();
const fs = require('fs');

const filename = 'public/storage/users.json';

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send(findUsers());
});

router.get('/checkUsername', function(req, res, next) {
	const user = findUser(req.query.username);
	console.log('username user = ', user)
	res.send(user);
});

router.post('/', function (req, res) {
	// console.log('req params (to get GET data) = ', req.params);
	// console.log('req body (to get POST data) = ', req.body);
	const user = findUser(req.body.username);
	if (user) {
		return res.send({userExist: true, userData: null});
	}
	saveUser(req.body, cb);
	function cb(response) {
		res.send({userExist: false, userData: response.userData});
	}
});

router.post('/login', function(req, res) {
	const user = findUser(req.body.username);
	if (user && user.password === req.body.password) {
		return res.send({userExist: true, userData: user});
	}
	res.send({userExist: false, userData: null});
});


/*
data storage operations
*/

function findUsers() {
	const file = fs.readFileSync(filename);
	return file.toString();
}

function findUser(username) {
	const users = findUsers();
	for(const user of JSON.parse(users)) {
		if (user.username.toLowerCase() === username.toLowerCase()) {
			return user;
		}
	}
	return null;
}

function saveUser(userData, cb) {
	console.log('save post userData = ', userData)
	const users = findUsers();
	let usersObj = JSON.parse(users);
	userData.token = userData.username;
	usersObj.push(userData);
	fs.writeFile(filename, JSON.stringify(usersObj), function(err, data) {
		let status = false;
		if (err) {
			console.log('error writing into users.json file', err);
		}
		status = true;
		cb({status: status, userData: userData});
	});
}

/*
END
*/

module.exports = router;
