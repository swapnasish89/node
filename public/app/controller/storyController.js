angular.module('storyCtrl',['storyService'])

.controller('StoryController', function(Story, socketIo){
	var vm = this;

		Story.allStory().then(function(data){
			vm.allStories = data;
		});

	vm.createStory = function(){

		vm.message = '';

		Story.createStory(vm.storyData).then(function(data){

			vm.storyData = {};
			vm.message = data.message;

			
			
		});
	};

	socketIo.on('story', function(data){

			vm.allStories.push(vm.storyData);
	})
	
})