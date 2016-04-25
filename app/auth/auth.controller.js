angular.module('mainApp')
    .controller('AuthCtrl', function(Auth, $state){
        var authCtrl = this;
        
        authCtrl.user = {
            email: '',
            password: ''
        };
        
        authCtrl.login = function() {
            Auth.$authWithPassword(authCtrl.user).then(function(auth){
                $state.go('admin');
            }, function(error){
                authCtrl.error = error;
            });
        };
        
        authCtrl.register = function (){
            Auth.$createUser(authCtrl.user).then(function(user){
                authCtrl.login();
            }, function (error){
                authCtrl.error = error;
            });
        };
    });
    // .controller('AlertCtrl', [
    //     '$scope', '$rootScope', function($scope, $rootScope) {
    //         $rootScope.alert = {};
    //     }
    // ]);