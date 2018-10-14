angular.module('storyService',['userService'])

.factory('Story', function($http, AuthToken){
	var storyFactory = {};

	storyFactory.createStory = function(storyData){
		
		return $http.post('/api',storyData,{
				headers: {
       					 "x-access-token": AuthToken.getToken()
    					}
    			}).then(function successCallback(response){
    				return response.data;
		}, function errorCallback(response){

		});
	}


	storyFactory.allStory = function(){
		return $http.get('/api',{
				headers: {
       					 "x-access-token": AuthToken.getToken()
    					}
    			}).then(function successCallback(response){
			return response.data;
		}, function errorCallback(response){
			return response.data;
		});
	}


	return storyFactory;
})