angular.module('monopoly.header', [])

.controller('HeaderCtrl', ['$scope', '$location', 'GameService', 'UserService', function($scope, $location, GameService, UserService) {
	$scope.amount = 0

	$scope.location = $location.path();

	$scope.$watch(function(){
	    return UserService.user.credit;
	}, function (newValue) {
	    $scope.amount = newValue
	});

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