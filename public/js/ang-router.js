angular.module('appRoutes', ['ngRoute'])
	
	.config(function($routeProvider, $locationProvider) {
		
		$routeProvider

		.when('/home', {
			templateUrl: 'templates/home.html'
		})

		.when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'loginCtrl',
			controllerAs: 'login'
		})

		.when('/upload', {
			templateUrl: 'templates/upload.html'
		})

		.when('/register', {
			templateUrl: 'templates/register.html',
			controller: 'regCtrl',
			controllerAs: 'register'
		})

		.when('/news', {
			templateUrl: 'templates/news.html',
			controller: 'newsCtrl',
			controllerAs: 'news'
		})

		.when('/about', {
			templateUrl: 'templates/contact.html'
		})

		.when('/profile_:author', {
			templateUrl: 'templates/author.html',
			controller: 'authorCtrl',
			controllerAs: 'author'			
		})

		.when('/post/:author/img/:postId/:description', {
			templateUrl: 'templates/post.html',
			controller: 'postCtrl',
			controllerAs: 'post'			
		})

		.when('/profile', {
			templateUrl: 'templates/profile.html'
		})

		.when('/profile/subscribes', {
			templateUrl: 'templates/subscribes.html'
		})

		.when('/profile/subscribers', {
			templateUrl: 'templates/subscribers.html'
		})		

		.otherwise({ redirectTo: '/' })

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

	});
