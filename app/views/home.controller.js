angular.module('mainApp')
  .controller('HomeCtrl', function($scope){
    var homeCtrl = this;
    

    $scope.submitForm = function(){
        
        if ($scope.userForm.$valid) {
            alert('our form is amazing');
        } else {
            $scope.notValid = true;
        }
    };
  });