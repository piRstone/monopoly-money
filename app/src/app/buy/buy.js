angular.module('monopoly.buy', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('app.backbone.buy', {
		url: "/buy",
		views: {
			'backbone@app': {
				controller: 'BuyCtrl',
				templateUrl: 'buy/buy.tpl.html'
			}
		}
	});
}])

.controller('BuyCtrl', ['$rootScope', '$scope', 'GameService', 'UserService', function($rootScope, $scope, GameService, UserService) {
	$scope.showCard = false;
	$scope.properties = [];
	$scope.card = {};
	//$scope.properties = [{name: 'Boulevard de Belleville', price: 60, color: '#f96632'}, {name: 'La villette', price: 120, color: '#22d299'}];

	var getProperties = function() {
		GameService.getBuyableProperties(function(response) {
			for (i=0 ; i < response.length ; i++) {
				var obj = {};
				obj.id = response[i].id;
				obj.name = response[i].name;
				obj.price = response[i].price;
				obj.color = response[i].color;
				obj.h0 = response[i].h0;
				obj.h1 = response[i].h1;
				obj.h2 = response[i].h2;
				obj.h3 = response[i].h3;
				obj.h4 = response[i].h4;
				obj.h5 = response[i].h5;
				obj.g1 = response[i].g1;
				obj.g2 = response[i].g2;
				obj.g3 = response[i].g3;
				obj.g4 = response[i].g4;
				obj.house = response[i].house;
				obj.hypotheque = response[i].hypotheque;
				obj.type = response[i].type;
				if (obj.type == 'compagnie') {
					if (obj.name.search('eaux') != -1) {
						obj.companyType = 'water';
					} else if (obj.name.search('électricité') != -1) {
						obj.companyType = 'electricity';
					}
				}
				$scope.properties.push(obj);
			}
		}, function() {});
	}
	getProperties();

	$scope.showPropertyCard = function(index) {
		if (UserService.user.credit < $scope.properties[index].price) {
			console.error('pas assez d\'argent');
		} else {
			$rootScope.$emit('event:modalCard', [$scope.properties[index]]);
		}
	}

}])

;