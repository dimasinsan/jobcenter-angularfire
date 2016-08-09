angular.module('mainApp')
    .controller('HomeCtrl', function($scope, $http) {
        var homeCtrl = this;
        
        $scope.submitForm = function(user) {

            if ($scope.userForm.$invalid === true) {
                $scope.notValid = true;
                return
            }
            $scope.postData = angular.copy(user);

            $http.post('/contact', $scope.postData)
                .success(function(data) {
                    alert('successfully emailed form');
                })
                .error(function(data) {
                    alert('something went wrong');
                });
        };
    });