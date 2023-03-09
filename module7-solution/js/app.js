(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('trippleDollar', TrippleDollarFilter);
    
    //ToBuyController
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
        
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getToBuyList();
        
        toBuy.update = function(index) {
            if (toBuy.items[index].quantity === undefined || 
                toBuy.items[index].quantity < 1) {
                    toBuy.items[index].quantity = 1;
            } 
            //taking care of decimal values
            toBuy.items[index].quantity = Math.floor(toBuy.items[index].quantity);

            ShoppingListCheckOffService.updateLists(index);
        }

    }

    //AlreadyBoughtController
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
        
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getBoughtList();
        
        //calculate total price for that item
        alreadyBought.getTotalPrice = function(index) {
            return alreadyBought.items[index].quantity * alreadyBought.items[index].pricePerItem;
        }
    }

    function ShoppingListCheckOffService() {
        var service = this;

        //list of to buy items
        var toBuyList = [
            { name: "cookies", quantity: 10, pricePerItem: 5 },
            { name: "carrots", quantity: 5, pricePerItem: 4 },
            { name: "eggs", quantity: 12, pricePerItem: 7 },
            { name: "tofu", quantity: 5, pricePerItem: 3 },
            { name: "garlic", quantity: 3, pricePerItem: 2 }
        ];

        //list of already bought items
        var boughtList = [];

        //add to bought list
        service.addItem = function(itemName, quantity, pricePerItem) {
            var item = {
                name: itemName,
                quantity: quantity,
                pricePerItem: pricePerItem
            };
            boughtList.push(item);
        };

        //remove from toBuy list
        service.removeItem = function (itemIndex) {
            toBuyList.splice(itemIndex, 1);
        };

        //update both lists
        service.updateLists = function (itemIndex) {    
            this.addItem(toBuyList[itemIndex].name, toBuyList[itemIndex].quantity, toBuyList[itemIndex].pricePerItem);
            this.removeItem(itemIndex);
        }

        service.getToBuyList = function () {
            return toBuyList;
        };

        service.getBoughtList = function () {
            return boughtList;
        };
    }

    //filter to add $$$ and make the number looks like price
    function TrippleDollarFilter() {
        return function (input) {
            
            input = input || "";
            input = Number(input).toFixed(2);            
            input = "$$$" + input;
            return input;
        };
    }

})();
    