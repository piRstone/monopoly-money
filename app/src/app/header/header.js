angular.module('monopoly.header', [])

.controller('HeaderCtrl', ['$scope', '$location', 'GameService', 'UserService', function($scope, $location, GameService, UserService) {
	$scope.amount = UserService.user.credit;

	$scope.location = $location.path();

	/*var loadCredit = function(before, after) {
		$({numberValue: 0}).animate({numberValue: after}, {
		    duration: 1500,
		    easing: "swing",
		    step: function() { 
		        $('#credit').text(Math.round(this.numberValue));
		    }
		});
	}
	loadCredit(0, $scope.amount);

	$scope.$watch('amount', function(v, old) {
		loadCredit(old, v);
	});*/
}])

;