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
	'monopoly.modalStart',
	'monopoly.modalBirthday',

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
			},
			modalStart: {
				controller: 'ModalStartCtrl',
				templateUrl: 'modals/modalStart.tpl.html'
			},
			modalBirthday: {
				controller: 'ModalBirthdayCtrl',
				templateUrl: 'modals/modalBirthday.tpl.html'
			}
	    }
	});
}])

.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
}])


.controller('AppCtrl',['$rootScope', '$scope', 'UserService', '$timeout', 'CookieService', function($rootScope, $scope, UserService, $timeout, CookieService) {
	if (UserService.user.id == undefined) {
		if (CookieService.getItem('user_id') != "" && CookieService.getItem('user_id') != undefined && CookieService.getItem('user_id') != "" && CookieService.getItem('user_id') != undefined) {
			var g = CookieService.getItem('game_id');
			var u = CookieService.getItem('user_id');
			UserService.setUserGame(g, u, function() {}, function(error) {console.error(error);});
		} else {
			$timeout(function() {
				$scope.$emit('event:modalSetUser', []);
			}, 1000);
		}
	}
}])

;