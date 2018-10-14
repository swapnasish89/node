angular.module('mainCtrl', [])

.controller('signUpController',['$rootScope','$location', 'User','Auth', function($rootScope,  $location, User, Auth){
	
	var vm = this;

	vm.signupUser = function(){
		vm.message = '';

		User.createUser(vm.userData).then(function(data){
				vm.processing = false;

				if(data.success){
					Auth.getUser()
					.then(function(data){
						vm.user = data;
					});
					
						$location.path('/');
					} else {
						vm.error = data.message;
					}

			});
	}
}])

.controller('mainController', [ '$rootScope', '$location', 'Auth', function($rootScope, $location, Auth){
	var vm = this;

	$rootScope.$on('$routeChangeStart', function(){

		vm.loggedIn = Auth.isLoggedIn();
		
		if(vm.loggedIn){

			Auth.getUser().then(function(data){						
				vm.userData = data;
			});

		} 
	});

	vm.doLogin = function(){
		vm.processing = true;
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.then(function(data){
				vm.processing = false;

				if(data.success){
					Auth.getUser()
					.then(function(data){
						vm.user = data;
					});
					
						$location.path('/');
					} else {
						vm.error = data.message;
					}

			});
	}

	vm.doLogout = function(){
		Auth.logout();
		$location.path('/login');
	}

	
}])