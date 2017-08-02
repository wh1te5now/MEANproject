angular.module('regController', [])
	.controller('regCtrl', function($http, $location, $timeout){
		var _this = this;
		_this.regUser = function(regData) {
			_this.errorMsg = false;
			_this.successMsg = false;
			$http.post('/reg', regData).then(function(data) {
				if (data.data.success) {
					_this.successMsg = data.data.message;
					$timeout(function(){
						$location.path('/home');
					}, 1000);
				} else {
					_this.errorMsg = data.data.message;
				}
			});
		};
	});