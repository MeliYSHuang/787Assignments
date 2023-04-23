(function() {
    "use strict";

    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['UserService', 'menuItem'];

    function MyInfoController(UserService, menuItem) {
        var myInfoCtrl = this;
        myInfoCtrl.user = UserService.getUser();
        if (myInfoCtrl.user !== undefined) {
            myInfoCtrl.user.menuItem = menuItem;
        }
    }
})();