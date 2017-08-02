var imagesApp = angular.module("imagesApp", ['appRoutes', 'regController', 'loginController',
     'profileController', 'postController', 'authorController', 'newsController',
     'profileSubscribesController', 'profileSubscribersController', 'searchController']);

    imagesApp.controller("imagesController", function ($scope, $http, $window, $rootScope, $timeout) {

    	var _this = this;
    	var userIsLogin = true;

        $(document).on('click',function(){
            $('.collapse').collapse('hide');
        });

    	$scope.submit = function (){
    		var formData = new FormData;
    		var file = $window.temp;
            if((file.last - file.deleted) > 10){
                $scope.errorUploadMsg = 'Нельзя отправить более 10 файлов за раз.';
                $timeout(function() { $scope.errorUploadMsg = false }, 1000);
            } else {
            if((file.last) && (file.last!=file.deleted)) {
    		for(var i = 0; i < file.last; i++){
                if (file[i]) {
                    formData.append('image' + i, file[i]);
                    if(file.descs[i]){
                        file.descs[i] = file.descs[i].replace(/  /gi, function() {
                          return '';
                        });
                    };                        
                    if((!file.descs[i]) || (file.descs[i] == '') || (file.descs[i] == ' ')){
                        file.descs[i] = 'Описание отсутствует.';
                        formData.append('desc' + i, file.descs[i]);
                    } else {
                       formData.append('desc' + i, file.descs[i]); 
                    };
                    
                };
               
    		};

    		formData.append('author', _this.username);

    		$http.post('/testUpload', formData, {
    			transformRequest: angular.identity,
    			headers: {
    				'Content-Type': undefined
    			}
    		}).success(function(res){
                $scope.successUploadMsg = res.success;
                imgs = document.querySelectorAll('.holder');
                for(var i = 0; i < imgs.length; i++) {
                    imgs[i].parentElement.removeChild(imgs[i]);
                }
                $window.temp = {descs: Array(0), deleted: 0};
                $timeout(function() { $scope.successUploadMsg = false }, 1000);
    		});

        };

    };

    	};

		_this.logout = function(){
			$window.localStorage.removeItem('token');
            $window.localStorage.removeItem('subscribes');
		};

        $rootScope.$on('$routeChangeStart', function() {

	        if ($window.localStorage.token) {
				$http({ method: 'POST', url: '/me' }).
					then(function success(response) {
						if(response.data.username) {
							_this.userIsLogin = true;
							_this.username = response.data.username;
                            $rootScope.name = _this.username;
						} else {
							_this.username = '';
							_this.userIsLogin = false;
						};
					});
			} else {
				_this.username = '';
				_this.userIsLogin = false;
			};	
        });  
            
	});

    imagesApp.factory('AuthInterceptors', function($window) {
    	var AuthInterceptorsFactory = {};
    	AuthInterceptorsFactory.request = function(config) {
    		var token = $window.localStorage.getItem('token');
    		if (token) config.headers['x-access-token'] = token;
    		return config;
    	};

		return AuthInterceptorsFactory;

    });

	imagesApp.config(function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptors');
	});
