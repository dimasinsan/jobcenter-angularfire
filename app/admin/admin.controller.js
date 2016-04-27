angular.module('mainApp')
    .controller('AdminCtrl', function($state, Auth, Users, profile){
        var adminCtrl = this;
        
        adminCtrl.profile = profile;
        
        adminCtrl.getDisplayName = Users.getDisplayName;
        
        adminCtrl.logout = function() {
            Auth.$unauth();
            $state.go('home');
        }
    });