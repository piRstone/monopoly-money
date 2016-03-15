angular.module('monopoly.modalBirthday', [])

.controller('ModalBirthdayCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'GameService', 
	function($rootScope, $scope, $location, $timeout, GameService) {

	$scope.showModalBirthday = false;
	$scope.done = false;

	var eventModalBirthday = $rootScope.$on('event:modalBirthday', function(event, data) {
		$scope.showModalBirthday = !$scope.showModalBirthday;
		$scope.player = data[0];
		$scope.done = false;
	});

	$scope.giveGift = function() {
		GameService.birthday($scope.player.id, function(){
			$scope.done = true;
			$timeout(function() {
				$scope.showModalBirthday = false;
			}, 1000);
		}, function(){});
	}

	$scope.$on('$destroy', eventModalBirthday);
}])

;