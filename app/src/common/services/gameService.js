angular.module('monopoly.gameService', [])

.factory('GameService', ['$rootScope', '$http', function($rootScope, $http) {
	var amount = 1490;
	var properties = [];

	var getProperties = function() {
		$http({
			method: 'GET',
			url: '/data/getProperties.php'
		}).then(function (response) {
			for (i=0 ; i < response.data.length ; i++) {
				properties.push(response.data[i]);
			}
		}, function(error){});
	}

	return {
		amount: amount,
		properties: properties,
		getProperties, getProperties
	};
}])

;