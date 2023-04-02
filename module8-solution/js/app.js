(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowDown = this;
        narrowDown.searchTerm = "";
        
        narrowDown.getList = function() {
            if(narrowDown.searchTerm) {
                //search for match with lower case only
                var promise = MenuSearchService.getMatchedManuItems(narrowDown.searchTerm.toLowerCase());
                promise.then(function(result) {
                    narrowDown.found = result;
                }).catch(function(error) {
                    console.log("Something went terrible wrong");
                });
                
            } else {
                //taking care of empty search
                narrowDown.found = [];
            }
        }

        narrowDown.removeItem = function (itemIndex) {
            //remove item at index
            narrowDown.found.splice(itemIndex, 1);
        }
        
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedManuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
            }).then(function (result) {
                //process result and only keep items that match
                var foundItems = [];
                var allMenuItems = result.data;
                
                //root items
                for(var root in allMenuItems) {
                    //get menu_items
                    for(var menuItem in allMenuItems[root].menu_items) {
                        //add to list if matched
                        if(allMenuItems[root].menu_items[menuItem].description.includes(searchTerm)){
                            foundItems.push(allMenuItems[root].menu_items[menuItem]);
                        }
                    }
                    
                }
                return foundItems;
            });
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
        list.validList = function() {
            //error msg when list is empty
            if(list.foundItems.length === 0) {
                console.log(list.foundItems.length);
                return true;
            }           
            return false;
        };
    }

})();
    