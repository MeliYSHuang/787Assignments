(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getAllItems = function () {
    return $http.get(ApiPath + '/menu_items/.json').then(function (result) {
        
        var allItems = [];
        var allMenuItems = result.data;
        
        //root items
        for(var root in allMenuItems) {
            //get menu_items
            for(var menuItem in allMenuItems[root].menu_items) {
                //add to list
                allItems.push(allMenuItems[root].menu_items[menuItem]);
                
            }
            
        }
        return allItems;
    });

  };

}



})();
