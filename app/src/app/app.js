angular.module('monopoly', [
	'monopoly.header',
	'monopoly.page',

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
	})
}])


.controller('AppCtrl',['$scope', function($scope) {
	$scope.text = 'Bonjour';
}])

;