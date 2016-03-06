angular.module('monopoly.gameService', [])

.factory('GameService', ['$rootScope', '$http', 'UserService', function($rootScope, $http, UserService) {
	var amount = 1490;
	var properties = [];

	var getProperties = function() {
		$http.get('/data/getProperties.php').then(function(response) {
			for (i=0 ; i < response.data.length ; i++) {
				properties.push(response.data[i]);
			}
		}, function(error){});
	}

	var getBuyableProperties = function(success, error) {
		$http.get('/data/getBuyableProperties.php').then(function(response) {
			success(response.data);
		}, function(error) {});
	}

	var buyProperty = function(card, success, error) {
		var data = $.param({
			user: UserService.user.id,
			property: card.id
		});
		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		$http.post('/data/postBuyProperty.php', data, config).then(function(response) {
			if (response.data > 0) {
				UserService.user.credit -= card.price;
			}
			success(response.data);
		}, function(error) {});
	}

	return {
		amount: amount,
		properties: properties,
		getProperties, getProperties,
		getBuyableProperties: getBuyableProperties,
		buyProperty: buyProperty
	};
}])

;