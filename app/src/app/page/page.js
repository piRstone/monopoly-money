angular.module('monopoly.page', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('app.backbone.page', {
		url: "/page",
		views: {
			'backbone@app': {
				controller: 'PageCtrl',
				templateUrl: 'page/page.tpl.html'
			}
		}
	});
}])

.controller('PageCtrl', ['$scope', function($scope) {
	$scope.pageText = "pageText";
}])