angular.module('monopoly.modalDelMoney', [])

.controller('ModalDelMoneyCtrl', ['$rootScope', '$scope', '$location', 'GameService', function($rootScope, $scope, $location, GameService) {

	$scope.showModalDelMoney = false;

	var eventModalDelMoney = $rootScope.$on('event:modalDelMoney', function(event, data) {
		$scope.showModalDelMoney = !$scope.showModalDelMoney;
		$('#del-money').focus();
	});

	$scope.delMoney = function(amount) {
		GameService.delMoney(amount, function(response) {
			$scope.showModalDelMoney = false;
		}, function(){});
	}

	$scope.$on('$destroy', eventModalDelMoney);
}])

;