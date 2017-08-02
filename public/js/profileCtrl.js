angular.module('profileController', [])

	.controller('profileCtrl', function($http, $scope, $window, $rootScope) {
		var _this = this;

		var showPosts = function () {
			$http.post('/profileTest')
				.success(function(res){
					$scope.posts = res;
				});
		};

		showPosts();

		_this.getSubscribers = function(name){
			var req = {name: name};
			$http.post('/api/getSubscribers', req)
				.success(function(res){
					$scope.subscribers = res[0].subscribers;
				});			
		};

		_this.getSubscribers($rootScope.name);

		_this.getSubscribes = function(name){
			var req = {name: name};
			$http.post('/api/getSubscribes', req)
				.success(function(res){
					$scope.subscribes = res[0].news;
				});
		};

		_this.getSubscribes($rootScope.name);

		_this.delPost = function (post) {
			$http.post('/postDelete', post)
				.success(function(res){
					var el = angular.element('#' + post._id);
					el.remove();
				});
		};

		_this.editPost = function (post, index) {
			var textareaDesc = angular.element(document.querySelector('.desc-' + index));
			var editBtn = angular.element(document.querySelector('.editBtn-' + index));
			var saveBtn = angular.element(document.querySelector('.saveBtn-' + index));
			var delBtn = angular.element(document.querySelector('.delBtn-' + index));
			var descShow = angular.element(document.querySelector('.descShow-' + index));
			editBtn.toggleClass("hide");
			descShow.toggleClass("hide");
			saveBtn.toggleClass("hide");
			delBtn.toggleClass("hide");
			textareaDesc.toggleClass("hide");
		};

		_this.savePost = function (post, index) {
			var textareaDesc = angular.element(document.querySelector('.desc-' + index));
			var editBtn = angular.element(document.querySelector('.editBtn-' + index));
			var saveBtn = angular.element(document.querySelector('.saveBtn-' + index));
			var delBtn = angular.element(document.querySelector('.delBtn-' + index));
			var descShow = angular.element(document.querySelector('.descShow-' + index));
			descShow.toggleClass("hide");
            delBtn.toggleClass("hide");
			editBtn.toggleClass("hide");
			saveBtn.toggleClass("hide");
			textareaDesc.toggleClass("hide");
			var textareaDesc = document.querySelector('.desc-' + index);
			post.description = textareaDesc.value;
			$http.post('/updateDesc', post) 
				.success(function(res){
					console.log('rabotaet! Desc obnovilsa.');
				})
				.error(function(res){
					console.log('ups! Oshibochka vishla.');
				});


		};

	});
