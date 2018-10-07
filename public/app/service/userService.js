angular.module('userService', [])

.factory('Auth', function($http, $q, AuthToken){

	var authFactory = {};

	authFactory.login = function(username, password){

		return $http.post('/api/login', {
			username : username,
			password : password
		}).then(function  mySuccess(response){
			AuthToken.setToken(response.data.token);	
			return response.data;
		}, function errorCallback(response){
			alert("Login Failed.");
			return response.data;
		});
	}

	authFactory.logout = function(){
		AuthToken.setToken();
	}

	authFactory.isLoggedIn = function(){

		if(AuthToken.getToken()){
			return true;
		} else {
			return false;
		}
	}

	authFactory.getUser = function(){
		
		if(AuthToken.getToken()){

			return  $http.get('/api/currentUser', {
				headers: {
       					 "x-access-token": AuthToken.getToken()
    					}
    			}).then(function mySuccess(response){
    				return response.data;
    			});

		} else {
			return false;
		}
	}


	return authFactory;
})


.factory('AuthToken', function($window){
	var authTokenFactory = {};

	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	}

	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem('token',token );
		} else {
			$window.localStorage.removeItem('token');
		}
	}	

	return authTokenFactory;

})

.factory('AuthInterceptor', function($q, $location, authToken ) {
	var authInterceptorFactory = {};

	authInterceptorFactory.request = function(config){
		var token = authToken.getToken();

		if(token){
			config.headers['x-access-token'] = token;
		} 

		return config;
	}

	authInterceptorFactory.responseErr = function(response){
		if(response.status == 403){
				$location.path('/login');
		}

		return $q.reject(response);
	}

	return authInterceptorFactory;

});