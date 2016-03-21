angular.module('monopoly.modalAddMoney', [])

.controller('ModalAddMoneyCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'GameService', function($rootScope, $scope, $location, $timeout, GameService) {

	$scope.showModalAddMoney = false;

	var eventModalAddMoney = $rootScope.$on('event:modalAddMoney', function(event, data) {
		$scope.showModalAddMoney = !$scope.showModalAddMoney;
		$timeout(function() {
			$('#add-money').focus();
		}, 10);
	});

	$scope.addMoney = function(amount) {
		GameService.addMoney(amount, function(response) {
			$scope.showModalAddMoney = false;
			$scope.amount = "";
			$scope.delForm.$setPristine();
		}, function(){});
	}

	$scope.$on('$destroy', eventModalAddMoney);
}])

;