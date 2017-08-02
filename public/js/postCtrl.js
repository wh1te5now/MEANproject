angular.module('postController', [])
	.controller('postCtrl', function($routeParams) {
		_this = this;
		_this.imgSrc = $routeParams.postId;
		_this.description = $routeParams.description;
	});