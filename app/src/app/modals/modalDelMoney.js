angular.module('monopoly.modalDelMoney', [])

.controller('ModalDelMoneyCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'GameService', function($rootScope, $scope, $location, $timeout, GameService) {

	$scope.showModalDelMoney = false;

	var eventModalDelMoney = $rootScope.$on('event:modalDelMoney', function(event, data) {
		$scope.showModalDelMoney = !$scope.showModalDelMoney;
		$timeout(function() {
			$('#del-money').focus();
		}, 10);
	});

	$scope.delMoney = function(amount) {
		GameService.delMoney(amount, function(response) {
			$scope.showModalDelMoney = false;
			$scope.amount = "";
			$scope.addForm.$setPristine();
		}, function(){});
	}

	$scope.$on('$destroy', eventModalDelMoney);
}])

;