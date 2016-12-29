(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var toBuy = this;
  	
  	toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  	toBuy.bought = function (itemIndex) {
  		ShoppingListCheckOffService.bought(itemIndex);
  	}
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  	var alreadyBought = this;
  	
  	alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
};

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
	  { name: "cookies", quantity: 10 },
    { name: "bubble gums", quantity: 2 },
    { name: "apples", quantity: 3 },
    { name: "bread", quantity: 1 },
    { name: "orange juces", quantity: 6 },
    { name: "chocolates", quantity: 9 }
  ];
  var alreadyBoughtItems = [];

  service.bought = function (itemIndex) {
    var boughtItem = toBuyItems[itemIndex]
    toBuyItems.splice(itemIndex, 1);
    alreadyBoughtItems.push(boughtItem);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };
}
})();
