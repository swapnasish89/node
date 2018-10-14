angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider

	.when('/', {
		templateUrl : 'app/views/pages/home.html',
		resolve:{
        "check":function($location,Auth){ 
                if(!Auth.isLoggedIn()){ 
                   $location.path('/login');
                }
            }
        }


})
	.when('/login' ,{
    templateUrl: "app/views/pages/login.html",
    resolve:{
        "check":function($location,Auth){ 
            if(Auth.isLoggedIn()){ 
               $location.path('/dashboard');
            }
        }
    }})


	.when('/signup', {
		templateUrl : 'app/views/pages/signup.html',
	    resolve:{
	        "check":function($location,Auth){ 
	            if(Auth.isLoggedIn()){ 
	               $location.path('/dashboard');
	            }
	        }
	    }})

	.otherwise({ redirectTo: '/login' })

	$locationProvider.html5Mode(true);
})