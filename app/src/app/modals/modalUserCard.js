angular.module('monopoly.modalUserCard', [])

.controller('ModalUserCardCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'GameService', 'UserService', function($rootScope, $scope, $location, $timeout, GameService, UserService) {
	$scope.card = {};

	var eventModalUserCard = $rootScope.$on('event:modalUserCard', function(event, data) {
		$scope.card = data[0];
		$scope.showUserCard = true;
		$scope.confirmBuy = false;
		$scope.confirmSell = false;
		$scope.nbSell = 0;
		$scope.priceOfHouses = 0;
		$scope.hypothec = false;
		$scope.swap = false;
		$scope.swapDone = false;
		$scope.players = [];
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
			$scope.showUserCard = false;
		}, function(error) {
			console.error(error.status);
		});
	}

	$scope.confirmSellHouse = function() {
		var currentNbHouses = $scope.card.nbHouses;
		GameService.sellHouse($scope.card, $scope.nbSell, function(response) {
			$scope.confirmSell = false;
			if (currentNbHouses == 5) {
				$scope.card.nbHouses = 0;
			} else {
				$scope.card.nbHouses -= $scope.nbSell;
			}
		}, function(error) {
			console.error(error.status);
		});
	}

	$scope.hypothecAction = function() {
		GameService.hypothecProperty($scope.card, function() {
			$scope.card.hypothecated = true;
			$scope.showUserCard = false;
		}, function(error) {
			console.error(error.status);
		});
	}

	$scope.showSwap = function() {
		if ($scope.card.nbHouses == 0) {
			$scope.players.splice(0, $scope.players.length);
			UserService.getPlayers(function(response) {
				for (i=0 ; i < response.length ; i++) {
					if (response[i].id != UserService.user.id) {
						$scope.players.push(response[i]);
					}
				}
				$scope.swap = true;
			}, function() {});
		}
	}

	$scope.swapProperty = function(index) {
		GameService.swapProperty($scope.card, $scope.players[index], function() {
			$scope.swapDone = true;
			$timeout(function() {
				$scope.card.hide = true;
				$scope.swap = false;
				$scope.showUserCard = false;
			}, 1500);
		}, function() {});
	}

	$scope.$on('$destroy', eventModalUserCard);
}])

;