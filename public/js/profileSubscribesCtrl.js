angular.module('profileSubscribesController', [])

	.controller('profileSubscribesCtrl', function($http, $scope, $window, $rootScope) {
		var _this = this;

		_this.getSubscribes = function(name){
			var req = {name: name};
			$http.post('/api/getSubscribes', req)
				.success(function(res){
					$scope.subscribes = res[0].news;
				});
		};

		_this.getSubscribes($rootScope.name);

		_this.getSubscribers = function(name){
			var req = {name: name};
			$http.post('/api/getSubscribers', req)
				.success(function(res){
					$scope.subscribers = res[0].subscribers;
				});			
		};

		_this.getSubscribers($rootScope.name);		

	});
