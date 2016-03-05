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

.controller('HomeCtrl', ['$scope', 'GameService', function($scope, GameService) {
	$scope.properties = GameService.properties;
}])

.controller('FooterCtrl', ['$scope', '$http', 'GameService', function($scope, $http, GameService) {
	$scope.getPro = function() {
		GameService.getProperties();
	}

	$scope.getProCtrl = function() {
		$http({
			method: 'GET',
			url: '/data/getProperties.php'
		}).then(function (response) {
			var properties = response.data;
			console.log(response.data);
		}, function(error){});
	}
}])

;