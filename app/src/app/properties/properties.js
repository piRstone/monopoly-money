angular.module('monopoly.properties', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('app.backbone.userProperties', {
		url: "/properties/user",
		views: {
			'backbone@app': {
				controller: 'UserPropertiesCtrl',
				templateUrl: 'properties/userProperties.tpl.html'
			}
		}
	});
}])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('app.backbone.playerProperties', {
		url: "/properties/player/:uid",
		views: {
			'backbone@app': {
				controller: 'PlayerPropertiesCtrl',
				templateUrl: 'properties/playerProperties.tpl.html'
			}
		}
	});
}])

.controller('UserPropertiesCtrl', ['$rootScope', '$scope', 'GameService', 'UserService', function($rootScope, $scope, GameService, UserService) {
	$('body').css('background-color', 'whitesmoke');

	$scope.user = UserService.user;
	$scope.properties = [];

	var getUserProperties = function() {
		UserService.getUserProperties(UserService.user.id, function(response) {
			for (i=0 ; i < response.length ; i++) {
				$scope.properties.push(response[i]);
			}
		}, function(error) {
			console.error(error.status);
		});
	}
	getUserProperties();

	$scope.showProperty = function(index) {
		$scope.$emit('event:modalCard', [$scope.properties[index]]);
	}

}])

.controller('PlayerPropertiesCtrl', ['$rootScope', '$scope', 'GameService', 'UserService', '$stateParams', function($rootScope, $scope, GameService, UserService, $stateParams) {
	$('body').css('background-color', 'whitesmoke');

	$scope.user = UserService.user;
	$scope.player = {};
	$scope.properties = [];

	var playerId = $stateParams.uid;

	var getPlayer = function() {
		UserService.getUserInfos(playerId, function(response) {
			$scope.player = response[0];
		}, function() {});
	}
	getPlayer();

	var getUserProperties = function() {
		UserService.getUserProperties(playerId, function(response) {
			for (i=0 ; i < response.length ; i++) {
				$scope.properties.push(response[i]);
			}
		}, function(error) {
			console.error(error.status);
		});
	}
	getUserProperties();

	$scope.showProperty = function(index) {
		$scope.$emit('event:modalCard', [$scope.properties[index]]);
	}

}])

;