angular.module('monopoly', [
	'monopoly.gameService',

	'monopoly.header',
	'monopoly.home',
	'monopoly.buy',

	'ui.router'
])

.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state('app', {
		abstract: true,
		templateUrl: 'app.tpl.html',
		controller: 'AppCtrl'
	})

	.state('app.backbone', {
		abstract: true,
		views: {
	    	header: {
		    	controller: 'HeaderCtrl',
		    	templateUrl: 'header/header.tpl.html'
	    	}
	    }
	});
}])

.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
}])


.controller('AppCtrl',['$rootScope', '$scope', function($rootScope, $scope) {
	
}])

;