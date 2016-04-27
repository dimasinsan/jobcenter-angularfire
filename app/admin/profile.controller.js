angular.module('mainApp')
  .controller('ProfileCtrl', function($state, auth, profile){
    var profileCtrl = this;
    
    profileCtrl.profile = profile;
    
    profileCtrl.updateProfile = function(){
        profileCtrl.profile.$save().then(function(){
          $state.go('admin');
        });
    };
  });