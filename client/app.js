var app = angular.module('simpleLoginApp', ['ngRoute'])

.directive('appHeader', function() {
  return {
    templateUrl: '/header/header.html'
  };
})

.directive('appFooter', function() {
  return {
    templateUrl: '/footer/footer.html'
  };
})

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: '/login/login.html',
			controller: 'LoginCtrl'
		})
		// .when('/logout', {
		//   templateUrl: '/templates/logout.html',
		//   controller: 'LogoutCtrl'
		// });
}]);
