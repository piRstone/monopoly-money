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

.controller('UserPropertiesCtrl', ['$rootScope', '$scope', '$timeout', 'GameService', 'UserService', function($rootScope, $scope, $timeout, GameService, UserService) {

	$scope.user = UserService.user;
	$scope.properties = [];

	var getUserProperties = function() {
		UserService.getUserProperties(UserService.user.id, function(response) {
			for (i=0 ; i < response.length ; i++) {
				if (response[i].type == 'compagnie') {
					if (response[i].name.search('eaux') != -1) {
						response[i].companyType = 'water';
					} else if (response[i].name.search('électricité') != -1) {
						response[i].companyType = 'electricity';
					}
				}
				$scope.properties.push(response[i]);
			}
		}, function(error) {
			console.error(error.status);
		});
	}
	$timeout(function() {
		getUserProperties();
	}, 10);

	$scope.showProperty = function(index) {
		if ($scope.properties[index].hypothecated == false) {
			$scope.$emit('event:modalUserCard', [$scope.properties[index]]);
		}
	}

}])

.controller('PlayerPropertiesCtrl', ['$rootScope', '$scope', 'GameService', 'UserService', '$stateParams', function($rootScope, $scope, GameService, UserService, $stateParams) {

	$scope.user = UserService.user;
	$scope.player = {};
	$scope.properties = [];

	var playerId = $stateParams.uid;

	var getPlayer = function() {
		UserService.getUserInfos(playerId, function(response) {
			$scope.player = response;
		}, function() {});
	}
	getPlayer();

	var getUserProperties = function() {
		UserService.getUserProperties(playerId, function(response) {
			for (i=0 ; i < response.length ; i++) {
				if (response[i].type == 'compagnie') {
					if (response[i].name.search('eaux') != -1) {
						response[i].companyType = 'water';
					} else if (response[i].name.search('électricité') != -1) {
						response[i].companyType = 'electricity';
					}
				}
				$scope.properties.push(response[i]);
			}
		}, function(error) {
			console.error(error.status);
		});
	}
	getUserProperties();

	$scope.showProperty = function(index) {
		if ($scope.properties[index].hypothecated == false) {
			$scope.$emit('event:modalPayRental', [$scope.properties[index], $scope.player]);
		}
	}

	$scope.showBirthday = function() {
		$scope.$emit('event:modalBirthday', [$scope.player]);
	}

}])

;