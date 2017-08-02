angular.module('authorController', [])
	.controller('authorCtrl', function($routeParams, $http, $scope, $rootScope, $window) {
		_this = this;
		_this.name = $routeParams.author;
		data = {
			name: $routeParams.author
		};

		if($routeParams.author == $rootScope.name){
			document.querySelector('.subscribeLink').style.display = 'none';
		}

		_this.checkSubscribesList = function(){

			var data = {
				name: $rootScope.name
			};

			$http.post('/api/subscribes', data)
				.success(function(res){
					$window.localStorage.setItem('subscribes', res[0].news);
					$rootScope.subscribes = res[0].news;
					for(var i = 0; i < $rootScope.subscribes.length; i++){
						if($rootScope.subscribes[i] == _this.name) {
							document.querySelector('.subscribeLink').innerText = 'Отписаться';
							break;
						} else {
							document.querySelector('.subscribeLink').innerText = 'Подписаться';	
						}
					}					
				});

		};	

		_this.checkSubscribesList();

		_this.subscribe = function(name, author){
			user = {name: name, author: author};
			if(document.querySelector('.subscribeLink').innerText == 'Отписаться'){
				$http.post('/api/unsubscribe', user);
				var subs = $window.localStorage.getItem('subscribes');
				subs = subs.split(',');
				var index = subs.indexOf(user.name);
				subs = subs.splice(index, 1);
				$window.localStorage.setItem('subscribes', subs);
				document.querySelector('.subscribeLink').innerText = 'Подписаться';
				_this.checkSubscribesList();
			} else {
				$http.post('/api/subscribe', user);
				var subs = $window.localStorage.getItem('subscribes');
				subs = subs.split(',');
				subs = subs.push(user.name);
				$window.localStorage.setItem('subscribes', subs);
				document.querySelector('.subscribeLink').innerText = 'Отписаться';
				_this.checkSubscribesList();
			};
		};

		$http.post('/api/author', data)
			.success(function(res){
				$scope.images = res;
			});
			
	});		
