angular.module('monopoly.userService', [])

.factory('UserService', ['$rootScope', '$http', 'CookieService', function($rootScope, $http, CookieService) {
	//var user = {id: 1, name: 'Pierre', game_id: 1, credit: 1490};
	var user = {};
	var freeParking = 0;

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
			user.nbGares = parseInt(response.data.nbGares);
			user.nbCompagnies = parseInt(response.data.nbCompagnies);
			CookieService.setItem('user_id', userId);
			CookieService.setItem('game_id', gameId);
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
		freeParking: freeParking,
		getGamesAndUsers: getGamesAndUsers,
		setUserGame: setUserGame,
		getUserInfos: getUserInfos,
		getPlayers: getPlayers,
		getUserProperties: getUserProperties
	};
}])

.factory('CookieService', [function() {
	var getItem = function(name) {
		var name = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) 
		{
			var c = ca[i].trim();
			if (c.indexOf(name)==0)
				return c.substring(name.length,c.length);
		}
		return "";
	}

	var setItem = function(name, value) {
		var d = new Date();
			d.setHours(d.getHours() + 1);
		var expires = "expires="+d.toGMTString();
		document.cookie = name + "=" + value + "; path=/; " + expires;
	}

	var removeItem = function(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
	}
	return {
		getItem: getItem,
		setItem: setItem,
		removeItem: removeItem
	};
}])

;