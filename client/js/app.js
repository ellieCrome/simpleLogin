var app = angular.module('simpleLoginApp', ['ngRoute']); //uirouter?

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/hello', {
            templateUrl: '/../templates/login.html',
            controller: 'LoginCtrl'
        })
        // .when('/logout', {
        //   templateUrl: '/templates/logout.html',
        //   controller: 'LogoutCtrl'
        // });
}]);
