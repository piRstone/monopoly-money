angular.module('monopoly.modalDelMoney', [])

.controller('ModalDelMoneyCtrl', ['$rootScope', '$scope', '$location', 'GameService', function($rootScope, $scope, $location, GameService) {

	var eventModalDelMoney = $rootScope.$on('event:modalDelMoney', function(event, data) {
		$scope.showModalDelMoney = true;
	});

	$scope.delMoney = function(amount) {
		GameService.delMoney(amount, function(response) {
			$scope.showModalDelMoney = false;
		}, function(){});
	}

	$scope.$on('$destroy', eventModalDelMoney);
}])

;