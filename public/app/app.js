angular.module('myApp', ['appRoutes','userService','mainCtrl','storyService','storyCtrl'])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
})