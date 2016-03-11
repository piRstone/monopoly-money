angular.module('monopoly.modalAddMoney', [])

.controller('ModalAddMoneyCtrl', ['$rootScope', '$scope', '$location', 'GameService', function($rootScope, $scope, $location, GameService) {

	$scope.showModalAddMoney = false;

	var eventModalAddMoney = $rootScope.$on('event:modalAddMoney', function(event, data) {
		$scope.showModalAddMoney = !$scope.showModalAddMoney;
		$('#add-money').focus();
	});

	$scope.addMoney = function(amount) {
		GameService.addMoney(amount, function(response) {
			$scope.showModalAddMoney = false;
		}, function(){});
	}

	$scope.$on('$destroy', eventModalAddMoney);
}])

;