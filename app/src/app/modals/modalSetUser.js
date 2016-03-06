angular.module('monopoly.modalSetUser', [])

.controller('ModalSetUserCtrl', ['$rootScope', '$scope', 'UserService', function($rootScope, $scope, UserService) {

	var eventModalSetUser = $rootScope.$on('event:modalSetUser', function(event, data) {
		$scope.showModalSetUser = true;
	});

	$scope.game = [];
	$scope.users = [];

	var getGamesAndUsers = function() {
		UserService.getGamesAndUsers(function(response) {
			for (i=0 ; i < response.games.length ; i++) {
				$scope.game.push(response.games[i]);
			}
			for (i=0 ; i < response.users.length ; i++) {
				$scope.users.push(response.users[i]);
			}
		}, function() {});
	}
	getGamesAndUsers();

	$scope.setUser = function(userGame) {
		if ($scope.setUserForm.$valid) {
			UserService.setUserGame(userGame.gameId, userGame.userId, function() {
				$scope.showModalSetUser = false;
			}, function() {});
		}
	}

	$scope.$on('$destroy', eventModalSetUser);
}])

;