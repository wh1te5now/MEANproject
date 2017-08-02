angular.module('newsController', [])

	.controller('newsCtrl', function($http, $rootScope, $scope, $window) {
		var _this = this;

		var user = {
			name: $rootScope.name
		};

		$http.post('/api/subscribes', user)
			.success(function(res){
				$window.localStorage.setItem('subscribes', res[0].news);
				var data = {
					subscribes: $window.localStorage.getItem('subscribes').split(',')
				}; 

				$http.post('/api/news', data)
					.success(function(res){
						$scope.images = res;
						for(var i = 0; i < res.length; i++){
							d = res[i].uploadTime;
							d = new Date(d);
							res[i].uploadTime = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() 
							+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '';
						}

					});	
							
			});		

	});