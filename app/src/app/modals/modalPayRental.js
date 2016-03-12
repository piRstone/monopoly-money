angular.module('monopoly.modalPayRental', [])

.controller('ModalPayRentalCtrl', ['$rootScope', '$scope', '$location', 'GameService', function($rootScope, $scope, $location, GameService) {
	$scope.card = {};
	$scope.player = {};
	var property = {};

	var eventModalPayRental = $rootScope.$on('event:modalPayRental', function(event, data) {
		$scope.card = data[0];
		property = data[0];
		$scope.player = data[1];
		$scope.rental = 0;
		$scope.showModalPayRental = true;
		$scope.showCompagnieAsk = false;

		if (property.type == 'terrain') {
			if (property.nbHouses == 0) {
				$scope.rental = property.h0;
			} else if (property.nbHouses == 1) {
				$scope.rental = property.h1;
			} else if (property.nbHouses == 2) {
				$scope.rental = property.h2;
			} else if (property.nbHouses == 3) {
				$scope.rental = property.h3;
			} else if (property.nbHouses == 4) {
				$scope.rental = property.h4;
			} else if (property.nbHouses == 5) {
				$scope.rental = property.h5;
			}
		} else if (property.type == 'gare') {
			if ($scope.player.nbGares == 1) {
				$scope.rental = property.g1;
			} else if ($scope.player.nbGares == 2) {
				$scope.rental = property.g2;
			} else if ($scope.player.nbGares == 3) {
				$scope.rental = property.g3;
			} else if ($scope.player.nbGares == 4) {
				$scope.rental = property.g4;
			}
		} else if (property.type == 'compagnie') {
			$scope.showCompagnieAsk = true;
		}
	});

	$scope.compagnieDices = function(dice) {
		if ($scope.player.nbCompagnies == 1) {
			$scope.rental = 4 * dice;
		} else if ($scope.player.nbCompagnies == 2) {
			$scope.rental = 10 * dice;
		}
		$scope.showCompagnieAsk = false;
	}

	$scope.payRental = function() {
		GameService.payRental($scope.rental, $scope.player, function() {
			$scope.showModalPayRental = false;
			$location.path('/home');
		}, function(error) {
			if (error.status == 401) {
				$('header').css('background-color', '#F44336');
			}
		});
	}

	$scope.$on('$destroy', eventModalPayRental);
}])

;