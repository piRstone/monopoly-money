angular.module('monopoly.userService', [])

.factory('UserService', ['$rootScope', '$http', function($rootScope, $http) {
	var user = {id: 1, name: 'Pierre', game_id: 1, credit: 1490};

	var getGamesAndUsers = function() {

	}

	var setUserGame = function() {

	}

	return {
		user: user,
		getGamesAndUsers: getGamesAndUsers,
		setUserGame: setUserGame
	};
}])

;