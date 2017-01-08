(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive("foundItems", FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'directives/foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var narrowItDownCtrl = this;

  narrowItDownCtrl.searchTerm = "";
  narrowItDownCtrl.found = [];
  narrowItDownCtrl.isNothingFound = false;

	narrowItDownCtrl.getMatchedMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(narrowItDownCtrl.searchTerm);
    promise.then(function (response) {
    if(narrowItDownCtrl.searchTerm.trim().length != 0 && response.length != 0) {
      narrowItDownCtrl.isNothingFound = false;
      narrowItDownCtrl.found = response;
    } else {
      narrowItDownCtrl.found = [];
      narrowItDownCtrl.isNothingFound = true;
    }
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
  }

  narrowItDownCtrl.removeItem = function (index) {
    narrowItDownCtrl.found.splice(index,1);
  }
};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      var foundItems = result.data.menu_items.filter(
        function (item) {
          return item.description.search(searchTerm) != -1;
        }
      );
      return foundItems;
    }).catch (function (error) {
        console.log(error);
      })
  };
}
})();
