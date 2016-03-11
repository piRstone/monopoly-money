angular.module('monopoly.userService', [])

.factory('UserService', ['$rootScope', '$http', function($rootScope, $http) {
	//var user = {id: 1, name: 'Pierre', game_id: 1, credit: 1490};
	var user = {};

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
			user.id = response.data.id;
			user.name = response.data.name;
			user.game_id = response.data.game_id;
			user.credit = parseInt(response.data.credit);
			var d = new Date();
			d.setHours(d.getHours() + 1);
			document.cookie = "user_id=" + userId + "; expires=" + d;
			document.cookie = "game_id=" + gameId + "; expires=" + d;
			success();
		}, function(responseError) {
			error(responseError);
		});
	}

	var getUserInfos = function(userId, success, error) {
		$http({
			method: 'GET',
			url: '/data/getUserInfos.php',
			params: {user: userId}
		}).then(function(response) {
			success(response.data);
		}, function(responseError) {
			error(responseError);
		});
	}

	var getPlayers = function(success, error) {
		$http.get('/data/getPlayers.php').then(function(response) {
			success(response.data);
		}, function(responseError) {
			console.log('getPlayer error');
		});
	}

	var getUserProperties = function(userId, success, error) {
		$http({
			method: 'GET',
			url: '/data/getUserProperties.php',
			params: {user: userId}
		}).then(function(response) {
			success(response.data);
		}, function(responseError) {
			error(responseError);
		});
	}

	return {
		user: user,
		getGamesAndUsers: getGamesAndUsers,
		setUserGame: setUserGame,
		getUserInfos: getUserInfos,
		getPlayers: getPlayers,
		getUserProperties: getUserProperties
	};
}])

;