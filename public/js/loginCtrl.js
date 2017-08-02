angular.module('loginController', [])

	.controller('loginCtrl', function($http, $window, $location, $timeout) {
		var _this = this;

		_this.doLogin = function(loginData) {
			_this.errorMsg = false;
			_this.successMsg = false;
			$http.post('/login', loginData).then(function(data) {
				if (data.data.success) {
					_this.successMsg = data.data.message;
					$window.localStorage.setItem('token', data.data.token);
					$timeout(function(){
						$location.path('/profile');
					}, 1000);
				} else {
					_this.errorMsg = data.data.message;
				}
			});
		};
	});

