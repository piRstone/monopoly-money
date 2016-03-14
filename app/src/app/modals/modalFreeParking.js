angular.module('monopoly.modalFreeParking', [])

.controller('ModalFreeParkingCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'GameService', 'UserService', 
	function($rootScope, $scope, $location, $timeout, GameService, UserService) {
	$scope.card = {};

	var eventModalFreeParking = $rootScope.$on('event:modalFreeParking', function(event, data) {
		$scope.amount = UserService.freeParking;
		$scope.process = 0;
		$scope.showModalFreeParking = true;
	});

	$scope.getFreeParking = function() {
		GameService.getFreeParking(function() {
			$scope.process++;
			$timeout(function() {
				$scope.showModalFreeParking = false;
			}, 1000);
		}, function() {});
	}

	$scope.$on('$destroy', eventModalFreeParking);
}])

;