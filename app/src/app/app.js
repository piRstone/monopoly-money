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
	'monopoly.modalUserCard',
	'monopoly.modalPayRental',
	'monopoly.modalFreeParking',

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
			},
			modalUserCard: {
				controller: 'ModalUserCardCtrl',
				templateUrl: 'modals/modalUserCard.tpl.html'
			},
			modalPayRental: {
				controller: 'ModalPayRentalCtrl',
				templateUrl: 'modals/modalPayRental.tpl.html'
			},
			modalFreeParking: {
				controller: 'ModalFreeParkingCtrl',
				templateUrl: 'modals/modalFreeParking.tpl.html'
			}
	    }
	});
}])

.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
}])


.controller('AppCtrl',['$rootScope', '$scope', 'UserService', '$timeout', function($rootScope, $scope, UserService, $timeout) {
	if (UserService.user.id == undefined) {
		if (document.cookie.length > 0) {
			var co = document.cookie.split(';');
			if (co[0].indexOf('user_id') != -1) {
				var t = co[0];
				var u = t.substring(8);
			}
			if (co[1].indexOf('game_id') != -1) {
				var f = co[1];
				var g = f.substring(9);
			}
			UserService.setUserGame(g, u, function() {}, function(error) {console.error(error);});
		} else {
			$timeout(function() {
				$scope.$emit('event:modalSetUser', []);	
			}, 1000);
		}
	}
}])

;