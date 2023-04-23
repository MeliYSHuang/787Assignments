(function () {
    "use strict";

    angular.module('common')
    .service('UserService', UserService);
   
    UserService.$inject = ['$http', 'ApiPath'];

    function UserService($http, ApiPath) {
        var service = this;

        service.setUser = function (newUser) {
            service.user = newUser;
            //set category name
            if (service.user.favMenuNum.length == 2) {
                service.user.menucategory = service.user.favMenuNum.charAt(0);
            } else {
                service.user.menucategory = service.user.favMenuNum.charAt(0) + service.user.favMenuNum.charAt(1);
            }
        };

        service.getUser = function () {
            if (service.user !== undefined) {
                return service.user;
            }
            
        };


        //get the user's favorite item
        service.getMenuItem = function () {
            if(service.user !== undefined) {
                return $http.get(ApiPath + '/menu_items/' + service.user.menucategory + '/menu_items/' + service.user.favMenuNum.charAt(service.user.favMenuNum.length - 1) + '.json').then(function (response) {
                
                    return response.data;
                  });
            } 
        };

        service.checkMenuItem = function (menuCategory, favMenuNum) {
            return $http.get(ApiPath + '/menu_items/' + menuCategory + '/menu_items/' + favMenuNum + '.json').then(function (response) {
                return response.data;
            });
        };
        

    }

})();