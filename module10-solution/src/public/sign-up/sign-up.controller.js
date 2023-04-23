(function () {
  "use strict";
  
  angular.module('public')
  .controller('SignUpController', SignUpController);
  
  SignUpController.$inject = ['UserService', 'allItems', '$filter'];
  
  function SignUpController(UserService, allItems, $filter) {
    var signUpCtrl = this;
    signUpCtrl.saved = false;
    
    signUpCtrl.checkShortname = function (favMenuNum, form) {
      favMenuNum = $filter('uppercase')(favMenuNum.$modelValue);
      if (favMenuNum !== undefined) {
        UserService.checkMenuItem(signUpCtrl.getCategory(favMenuNum), favMenuNum.charAt(favMenuNum.length - 1)).then(function(response) {
          if (response !== null) {
            form.favMenuNum.$setValidity("favMenuNum", true);
          } else {
            form.favMenuNum.$setValidity("favMenuNum", false);
          }
        });
      }
    };

    signUpCtrl.submit = function () {
      signUpCtrl.user.favMenuNum = $filter('uppercase')(signUpCtrl.user.favMenuNum);
      UserService.setUser(signUpCtrl.user);
      signUpCtrl.saved = true;
    };

    signUpCtrl.getCategory = function (shortname) {
      if(shortname.length === 2) {
        return shortname.charAt(0);
      }
      return shortname.charAt(0) + shortname.charAt(1);
    };
  }
  
  
  })();
  