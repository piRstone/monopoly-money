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

.controller('HomeCtrl', ['$scope', 'GameService', 'UserService', function($scope, GameService, UserService) {
	$scope.user = UserService.user;
	$scope.players = [];
	$scope.freePark = 0;
	$scope.freePark = GameService.freeParking;

	UserService.getPlayers(function(response) {
		for (i=0 ; i < response.length ; i++) {
			var player = {};
			player.id = response[i].id;
			player.name = response[i].name;
			player.nbProperties = response[i].nbProperties;
			$scope.players.push(player);
		}
	}, function() {});

	GameService.getFreeParkingAmount();
}])

.controller('FooterCtrl', ['$scope', 'GameService', 'UserService', function($scope, GameService, UserService) {
	$scope.addMoney = function() {
		$scope.$emit('event:modalAddMoney', []);
	}

	$scope.delMoney = function() {
		$scope.$emit('event:modalDelMoney', []);
	}
}])

;