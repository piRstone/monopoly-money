angular.module('monopoly.directives', [])

.directive('clickOutside', ['$window', '$timeout', function($window, $timeout){
	return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl) {
			var clickOnbutton = false;
			var clickOnElement = function(e) {
				clickOnbutton = true;
			};
			var clickOnDocument = function() {
				if (clickOnbutton == false) {
					scope.$apply(attr.clickOutside);
				}
				clickOnbutton = false;
			};
			element.on('click', clickOnElement);
			$(document).on('click', clickOnDocument);
			scope.$on('$destroy', function() {
				element.off('click', clickOnElement);
				$(document).off('click', clickOnDocument);
			});
		}
	};
}])

;