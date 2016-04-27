angular.module('mainApp')
    .factory('Admin', function($firebaseArray, FirebaseUrl){
        var ref = new Firebase(FirebaseUrl);
        var admin = $firebaseArray(ref);
        
        return admin;
    });