(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];
function LunchCheckerController($scope) {
  $scope.items = "";
  var msgOnEmptyInput = "Please enter data first!"
  $scope.checkIfTooMuch = function () {
	if($scope.items != "") {
        // NOT counting an 'empty' item towards the count of how many items there are in the list.
        // e.g case: item 1, item2,,item3 will be counted as 3 items. 
	    var listOfItems = $scope.items.split(",").filter(v => v.trim() != '');
	    if(listOfItems.length <= 0) {
			$scope.message = msgOnEmptyInput;
			$scope.state = "error"
	    } else if(listOfItems.length <= 3) {
	    	$scope.message = "Enjoy!";
	    	$scope.state = "success"
	    } else {
	    	$scope.message = "Too much!";
	    	$scope.state = "success"
	    }	
	} else {
		$scope.message = msgOnEmptyInput;
		$scope.state = "error"
	}
  };
};
})();
