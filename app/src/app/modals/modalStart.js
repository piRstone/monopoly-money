angular.module('monopoly.modalStart', [])

.controller('ModalStartCtrl', ['$rootScope', '$scope', '$location', 'GameService', function($rootScope, $scope, $location, GameService) {

	$scope.showModalStart = false;

	var eventModalStart = $rootScope.$on('event:modalStart', function(event, data) {
		$scope.showModalStart = !$scope.showModalStart;
	});

	$scope.start = function() {
		GameService.start(function(){
			$scope.showModalStart = false;
		}, function(){});
	}

	$scope.$on('$destroy', eventModalStart);
}])

;