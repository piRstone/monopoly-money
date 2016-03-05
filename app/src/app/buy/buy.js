angular.module('monopoly.buy', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('app.backbone.buy', {
		url: "/buy",
		views: {
			'backbone@app': {
				controller: 'BuyCtrl',
				templateUrl: 'buy/buy.tpl.html'
			}
		}
	});
}])

.controller('BuyCtrl', ['$scope', function($scope) {
	
}])

;