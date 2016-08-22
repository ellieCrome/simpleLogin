var app = angular.module('simpleLogin');

app.controller('LoginCtrl', function($scope, LoginService, $state) {
    $scope.user = {
        username: '',
        password: ''
    };

    $scope.login = function() {
      alert("inside!")
        LoginService.login($scope.username).then(function(msg) {

            $state.go('inside');
        }, function(errMsg) {
            var alertPopup = alert({
                title: 'Login failed!',
                template: errMsg
            });
        });
    };
})
