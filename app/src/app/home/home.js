angular.module('monopoly.home', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('app.backbone.home', {
		url: "/home",
		views: {
			'backbone@app': {
				controller: 'HomeCtrl',
				templateUrl: 'home/home.tpl.html'
			}
		}
	});
}])

.controller('HomeCtrl', ['$rootScope', '$scope', 'GameService', 'UserService', function($rootScope, $scope, GameService, UserService) {
	$scope.user = UserService.user;
	$scope.players = [];
	$scope.freePark = 0;
	$scope.freePark = UserService.freeParking;

	$scope.$watch(function(){
	    return UserService.freeParking;
	}, function (newValue) {
	    $scope.freePark = newValue;
	});

	UserService.getPlayers(function(response) {
		for (i=0 ; i < response.length ; i++) {
			var player = {};
			player.id = response[i].id;
			player.name = response[i].name;
			player.nbProperties = response[i].nbProperties;
			player.credit = response[i].credit;
			$scope.players.push(player);
		}
	}, function() {});

	GameService.getFreeParkingAmount();

	$scope.showFreeParking = function() {
		if ($scope.freePark > 0) {
			$rootScope.$emit('event:modalFreeParking', []);
		}
	}
}])

.controller('FooterCtrl', ['$scope', 'GameService', 'UserService', function($scope, GameService, UserService) {
	$scope.start = function() {
		$scope.$emit('event:modalStart', []);
	}

	$scope.addMoney = function() {
		$scope.$emit('event:modalAddMoney', []);
	}

	$scope.delMoney = function() {
		$scope.$emit('event:modalDelMoney', []);
	}
}])

;