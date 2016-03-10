angular.module('monopoly.modalUserCard', [])

.controller('ModalUserCardCtrl', ['$rootScope', '$scope', '$location', 'GameService', function($rootScope, $scope, $location, GameService) {
	$scope.card = {};

	var eventModalUserCard = $rootScope.$on('event:modalUserCard', function(event, data) {
		$scope.card = data[0];
		$scope.showUserCard = true;
		$scope.confirmBuy = false;
		$scope.confirmSell = false;
		$scope.nbSell = 0;
		$scope.priceOfHouses = 0;
	});

	$scope.toMuchError = false;
	$scope.buyHouse = function(count) {
		$scope.toMuchError = false;
		var nbHouses = parseInt($scope.card.nbHouses);
		if (count == nbHouses+1) {
			$scope.confirmBuy = true;
		} else if (count > nbHouses+1) {
			$scope.toMuchError = true;
		} else if (count <= nbHouses) {
			n = (nbHouses-count)+1;
			$scope.nbSell = n;
			$scope.priceOfHouses = ($scope.card.house / 2) * $scope.nbSell;
			$scope.confirmSell = true;
		}
	}

	$scope.confirmBuyHouse = function() {
		GameService.buyHouse($scope.card, function(response) {
			$scope.confirmBuy = false;
			$scope.card.nbHouses++;
		}, function(error) {
			console.error(error.status);
		});
	}

	$scope.confirmSellHouse = function() {
		GameService.sellHouse($scope.card, $scope.nbSell, function(response) {
			$scope.confirmSell = false;
			$scope.card.nbHouses -= $scope.nbSell;
		}, function(error) {
			console.error(error.status);
		});
	}

	$scope.$on('$destroy', eventModalUserCard);
}])

;