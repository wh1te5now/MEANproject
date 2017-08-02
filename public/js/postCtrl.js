angular.module('postController', [])
	.controller('postCtrl', function($routeParams, $http) {
		_this = this;
		var data = {_id: $routeParams.postId}
		$http.post('/api/getPost', data)
			.success(function(res){
				_this.post = res;
			});
	});