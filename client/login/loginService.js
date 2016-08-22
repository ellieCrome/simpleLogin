app.service('LoginService', function($q, $http) {

	var login = function(user) {
    console.log("hello")
		return $q(function(resolve, reject) {
			var API_ENDPOINT = 'http://localhost:8080/'
			$http.post(API_ENDPOINT.url + '/login', user).then(function(result) {
				if (result.data.success) {
					alert("hellooo")
					storeUserCredentials(result.data.token);
					resolve(result.data.msg);
				} else {
					alert('noo')
					reject(result.data.msg);
				}
			});
		});
	};
})
