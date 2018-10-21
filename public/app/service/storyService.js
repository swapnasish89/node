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

.factory('socketIo', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});