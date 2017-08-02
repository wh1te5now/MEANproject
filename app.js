var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');
var Post = require('./models/post');
var app = express();
var router = require('./router')
var port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(config.baseLab, {useMongoClient: true}, function(err) {
	if (err) {
		console.log('Not connected to the database: ' + err);
	} else {
		console.log('Successfully connected to MongoDB');
	}
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.listen(port, function(){
	console.log('Listen ' + port);
});

