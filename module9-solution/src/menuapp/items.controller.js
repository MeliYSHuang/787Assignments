(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['$stateParams', 'itemsObject'];
  
  function ItemsController ($stateParams, itemsObject) {
    var itemsController = this;

    //get selected category name
    itemsController.categoryName = itemsObject.category.name;
    
    //get menu items under selected category
    itemsController.list = itemsObject.menu_items;
  }
})();
