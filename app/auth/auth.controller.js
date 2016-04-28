angular.module('mainApp')
    .controller('AuthCtrl', function(Auth, $state){
        var authCtrl = this;
        
        var passVal = '';
        
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
            if (authCtrl.user.password != authCtrl.passVal) {
                authCtrl.IsMatch=true;
                return false;
              }
              authCtrl.IsMatch=false;
              Auth.$createUser(authCtrl.user).then(function(user){
                    $state.go('admin-list');
                }, function (error){
                    authCtrl.error = error;
                });
        };
        
        authCtrl.logout = function(){
            Auth.$unauth();
            $state.go('home');
        };
    });
    // .controller('AlertCtrl', [
    //     '$scope', '$rootScope', function($scope, $rootScope) {
    //         $rootScope.alert = {};
    //     }
    // ]);