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