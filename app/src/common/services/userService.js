angular.module('monopoly.userService', [])

.factory('UserService', ['$rootScope', '$http', function($rootScope, $http) {
	var user = {id: 1, name: 'Pierre', game_id: 1, credit: 1490};
	//var user = {};

	var getGamesAndUsers = function(success, error) {
		$http.get('/data/getGamesAndUsers.php').then(function(response) {
			success(response.data);
		}, function(responseError) {
			error();
		});
	}

	var setUserGame = function(gameId, userId, success, error) {
		$http({
			method: 'GET',
			url: '/data/getUserInfos.php',
			params: {user: userId}
		}).then(function(response) {
			user.id = response.data[0].id;
			user.name = response.data[0].name;
			user.game_id = response.data[0].game_id;
			user.credit = parseInt(response.data[0].credit);
			success();
		}, function(responseError) {
			error();
		});
	}

	return {
		user: user,
		getGamesAndUsers: getGamesAndUsers,
		setUserGame: setUserGame
	};
}])

;