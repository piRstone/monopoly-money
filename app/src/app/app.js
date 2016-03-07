angular.module('monopoly', [
	'monopoly.gameService',
	'monopoly.userService',
	'monopoly.directives',

	'monopoly.header',
	'monopoly.home',
	'monopoly.buy',
	'monopoly.properties',
	'monopoly.modalCard',
	'monopoly.modalAddMoney',
	'monopoly.modalDelMoney',
	'monopoly.modalSetUser',

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
	    	},
			modalCard: {
				controller: 'ModalCardCtrl',
				templateUrl: 'modals/modalCard.tpl.html'
			},
			modalAddMoney: {
				controller: 'ModalAddMoneyCtrl',
				templateUrl: 'modals/modalAddMoney.tpl.html'
			},
			modalDelMoney: {
				controller: 'ModalDelMoneyCtrl',
				templateUrl: 'modals/modalDelMoney.tpl.html'
			},
			modalSetUser: {
				controller: 'ModalSetUserCtrl',
				templateUrl: 'modals/modalSetUser.tpl.html'
			}
	    }
	});
}])

.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
}])


.controller('AppCtrl',['$rootScope', '$scope', 'UserService', '$timeout', function($rootScope, $scope, UserService, $timeout) {
	if (UserService.user.id == undefined) {
		$timeout(function() {
			$scope.$emit('event:modalSetUser', []);	
		}, 1000);
	}
}])

;