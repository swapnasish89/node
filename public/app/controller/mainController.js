angular.module('mainCtrl', [])

.controller('mainController', [ '$rootScope', '$location', 'Auth', function($rootScope, $location, Auth){
	var vm = this;

	$rootScope.$on('$rootChangeStart', function(){

		//vm.isLoggedIn = Auth.isLoggedIn();
		console.log("+++++++++++++++++++++++++++++ Hi ");
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
						console.log(data);
						vm.user = data.data;
					});
					
						$location.path('/');
					} else {
						vm.error = data.message;
					}

			});
	}

	vm.logout = function(){
		Auth.logout();
		$location.path('/logout ');
	}



}])