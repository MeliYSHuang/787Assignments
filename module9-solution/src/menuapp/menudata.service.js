(function () {
  'use strict';
  angular.module('Data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];

  function MenuDataService ($http) {
    var service = this;
    
    //Get All Categories
    service.getAllCategories = function () {
      return $http({
        method: "GET", 
        url: ("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json")
      }).then(function(result) {
        return result.data;
      });
    }
    
    //Get items from passed in category short name
    service.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: "GET", 
        url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + categoryShortName + ".json")
      }).then(function(result) {
        return result.data;
      });
    }
  }
})();
  