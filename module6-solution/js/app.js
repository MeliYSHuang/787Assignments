(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
        
    function LunchCheckController($scope) {
        $scope.message = '';

        $scope.checkMenu = function() {
            var entries;
            if ($scope.lunchMenu.length > 0) {
                entries = $scope.splitAndTrimText($scope.lunchMenu);
                if (entries.length > 0 && entries.length <= 3) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
                $scope.fontColor = "text-success";
            } else {
                $scope.message = "Please enter data first";
                $scope.fontColor = "text-danger";
            }
            
            
            
            
        }

        $scope.splitAndTrimText = function(text) {
            var splitText = text.split(',');
            var trimText = splitText.map(x => x.trim());
            var entries = [];

            for (var i = 0; i < trimText.length; i++) {
                if (trimText[i].length > 0 && trimText[i] != " ") {
                    entries.push(trimText[i]);
                }
            }

            return entries;
        }

    }

})();
    