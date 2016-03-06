angular.module('monopoly.modalAddMoney', [])

.controller('ModalAddMoneyCtrl', ['$rootScope', '$scope', '$location', 'GameService', function($rootScope, $scope, $location, GameService) {

	var eventModalAddMoney = $rootScope.$on('event:modalAddMoney', function(event, data) {
		$scope.showModalAddMoney = true;
	});

	$scope.addMoney = function(amount) {
		GameService.addMoney(amount, function(response) {
			$scope.showModalAddMoney = false;
		}, function(){});
	}

	$scope.$on('$destroy', eventModalAddMoney);
}])

;