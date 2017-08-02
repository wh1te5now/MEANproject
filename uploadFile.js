var express = require('express');
var router = express.Router();
var multer = require('multer');
var Post = require('./models/post');
var path = require('path');
var id;
var fs = require('fs');
var upload = multer({dest: 'public/img'});

router.post('/', upload.any() , function(req, res){
	var i = 0;
	if(req.files){
		req.files.forEach(function (file){
			var id = Date.now();
			var filename = id + file.originalname;
			fs.rename(file.path, 'public/img/' + filename, function(err){
				if(err) console.log('error in rename file', err);
			});

			var post = new Post();
			post.author = req.body.author;
			post.src = 'img/' + filename;
			post.description = req.body['desc' + i];
		    i++;

			post.save(function(err) {
				if (err) {
					console.log('err in save post', err);
				} 
			});

		});
	};
	res.json({success: 'Файлы успешно загружены!'});
	res.end();
});

module.exports.router = router;