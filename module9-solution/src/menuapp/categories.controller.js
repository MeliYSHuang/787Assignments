(function () {
  'use strict';
  
  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categoriesObject'];
  
  function CategoriesController (categoriesObject) {
      var categoriesController = this;
      categoriesController.list = categoriesObject;
  }
})();
