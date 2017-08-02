angular.module('homeController', [])

	.controller('homeCtrl', function($http, $scope, $timeout) {
		var _this = this;

		_this.submit = function(query) {

			var data = {
				q: query
			};

			$http.post('/api/home', data)
				.success(function(res){
					if(!res.message){
		    			$scope.images = res;
		    		}
	    		});

	    };		

	});



