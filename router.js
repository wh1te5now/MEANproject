var express = require('express');
var router = express.Router();
var uploadFile = require('./uploadFile');
var path = require('path');
var User = require('./models/user');
var Post = require('./models/post');
var jwt = require('jsonwebtoken');
var config = require('./config');
var fs = require('fs');
var username;

router.post('/reg', function(req, res) {
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	console.log(req.body);
	console.log(user);
	if (req.body.username == null || req.body.username == '' || req.body.password == null 
		|| req.body.password == '' || req.body.email == null || req.body.email == '') {
		res.send({ success: false, message: 'Заполните все поля!' });
	} else {
		user.save(function(err) {
			if (err) {
				console.log('err ', err);
				res.json({ success: false, message: 'Имя пользователя или пароль уже используются!' });
			} else {
				res.send({ success: true, message: 'Вы зарегистрированы!' });
			};
		});
	};
});

router.post('/login', function(req, res) {
	User.findOne({ username: req.body.username }).select('username password email')
	.exec(function(err, user) {
		if (err) {'throw err'};
		if (!user) {
			res.json({ success: false, message: 'Неверный логин' });
		} else if (user) {
			if (req.body.password) {
				var validPassword = user.comparePassword(req.body.password);
				} else {
					res.json({ success: false, message: 'Введите пароль!' });
				}			
			if (!validPassword) {
				res.json({ success: false, message: 'Пароль введен не правильно' });
			} else {
				var token = jwt.sign({ username: user.username, email: user.email }, config.secret, { expiresIn: '72h' } );
				res.json({ success: true, message: 'Вы вошли!', token: token });
			}
		}
	});
});

router.use('/testUpload', uploadFile.router);
router.use(express.static(path.join(__dirname, 'public')));
router.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/templates/index.html'));
});

router.use(function(req, res, next) {
	var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				res.json({ success: false, message: 'Token invalid!' });
			} else {
				req.decoded = decoded;
				username = decoded.username;
				next();
			};
		});
	} else {
		res.json({ success: false, message: 'No token provided' })
	}	
});

router.post('/postDelete', function(req, res) {
		Post.remove({src: req.body.src}, function(err, res){
	    if(err) return console.log(err);
	    fs.unlink('public/' + req.body.src);
	});
		res.send(200);
		res.end();
});

router.post('/profileTest', function(req, res) {
		Post.find({author: username}).sort({uploadTime: -1}).exec(function(err, docs){
	    if(err) return console.log(err);
	    res.json(docs);
	    res.end();		
	});
});

router.post('/updateDesc', function(req, res) {
	Post.findByIdAndUpdate(req.body._id, {description: req.body.description}, function(err, post){
	    if(err) return console.log('oshibka ', err);
	    res.send(200);
	    res.end();
	});
});

router.post('/api/author', function(req, res) {
	Post.find({author: req.body.name}).sort({uploadTime: -1}).exec(function(err, docs){
	    if(err) return console.log(err);
	    res.json(docs);	
	    res.end();	
	});
});

router.post('/api/search', function(req, res) { 
		regEx =  new RegExp(req.body.q, "gi");
		test = [{author: regEx}, {description: regEx}];
		Post.find({ $or: test }).sort('-uploadTime').exec(function(err, docs){
	    if(err) return console.log(err);
	    res.json(docs);
	    res.end();		
	});
});

router.post('/api/subscribes', function(req, res) {
	User.find({username: req.body.name}, {news: 1, _id: 0}).exec(function(err, docs){
	    if(err) return console.log(err);
	    res.json(docs);
	    res.end();		
	});
});

router.post('/api/getPost', function(req, res) {
	Post.findOne({_id: req.body._id}).exec(function(err, docs){
	    if(err) return console.log(err);
	    res.json(docs);
	    console.log(docs);
	    res.end();		
	});
});


router.post('/api/news', function(req, res) { 

	console.log('news = ', req.body);
	var q = [];
	var s = req.body.subscribes;

	for(var i = 0; i < s.length; i++) {
		q[i] = {author: s[i]}
	};

	console.log('q = ', q);

	Post.find({ $or: q }).sort({uploadTime: -1}).exec(function(err, docs){
    if(err) return console.log(err);
    console.log('docs = ', docs);
    res.json(docs);	
   	res.end();
	});	

});

router.post('/api/subscribe', function(req, res) { 
	User.update({username: req.body.author},{ $push: { news: req.body.name} }).exec(function(err, docs){
	    if(err) return console.log('err on subscribe = ', err);	
	});

	User.update({username: req.body.name},{ $push: { subscribers: req.body.author} }).exec(function(err, docs){
	    if(err) return console.log('err on subscribe = ', err);	
	});

	res.end();

});

router.post('/api/unsubscribe', function(req, res) { 
	User.update({username: req.body.author},{ $pull: { news: req.body.name} }).exec(function(err, docs){
	    if(err) return console.log('err on subscribe = ', err);	
	});

	User.update({username: req.body.name},{ $pull: { subscribers: req.body.author} }).exec(function(err, docs){
	    if(err) return console.log('err on subscribe = ', err);	
	});

	res.end();
});

router.post('/api/getSubscribes', function(req, res) { 
	User.find({username: req.body.name}, { news: 1, _id: 0}).exec(function(err, docs){
	    if(err) return console.log('get subscribes = ', err);
	    console.log('subscribes = ', docs);
	    res.send(docs);	
	    res.end();
	});
});

router.post('/api/getSubscribers', function(req, res) { 
	User.find({username: req.body.name}, { subscribers: 1, _id: 0}).exec(function(err, docs){
	    if(err) return console.log('get subscribes = ', err);
	    console.log('subscribers = ', docs);
	    res.send(docs);	
	    res.end();
	});
});

router.post('/me', function(req, res) {
	res.send(req.decoded);
});

module.exports = router;
