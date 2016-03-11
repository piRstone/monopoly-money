angular.module('monopoly.modalCard', [])

.controller('ModalCardCtrl', ['$rootScope', '$scope', '$location', 'GameService', function($rootScope, $scope, $location, GameService) {
	$scope.card = {};

	var eventModalCard = $rootScope.$on('event:modalCard', function(event, data) {
		$scope.card = data[0];
		$scope.showCard = true;
	});

	$scope.buyProperty = function() {
		GameService.buyProperty($scope.card, function(response) {
			if (response > 0) {
				$scope.showCard = false;
				$location.path('/home');
			}
		}, function() {

		});
	}

	$scope.cancel = function() {
		$scope.showCard = false;
	}

	$scope.$on('$destroy', eventModalCard);
}])

;