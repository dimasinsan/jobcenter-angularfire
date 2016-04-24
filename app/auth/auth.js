// angular
//   .module('mainApp', ['firebase'])
//   .controller('AlertCtrl', [ '$scope', '$rootScope', function($scope, $rootScope) { $rootScope.alert = {}; } ])
//   .controller('AuthCtrl', ['$scope', '$rootScope', '$window', '$firebaseAuth',
//   function($scope, $rootScope, $window, $firebaseAuth) {
//     var ref = new Firebase('https://jobcenter-id-auth.firebaseio.com');
//     $rootScope.auth = $firebaseAuth(ref);
    
//     $scope.createUser = function() {
//       $rootScope.alert.message = null;
//       $rootScope.error = null;

//       $rootScope.auth.$createUser({
//         email: $scope.email,
//         password: $scope.password
//       }).then(function(userData) {
//         $rootScope.alert.message = 'User created with uid: ' + userData.uid;
//       }).catch(function(error) {
//         $rootScope.error = error;
//       });
//     };

//     $scope.removeUser = function() {
//       $rootScope.alert.message = null;
//       $rootScope.error = null;

//       $rootScope.auth.$removeUser({
//         email: $scope.email,
//         password: $scope.password
//       }).then(function() {
//         $rootScope.alert.message = 'User removed';
//       }).catch(function(error) {
//         $rootScope.error = error;
//       });
//     };
    
//     $scope.authWithPassword = function() {
//       $rootScope.alert.message = null;
//       $rootScope.error = null;
      
//       $rootScope.auth.$authWithPassword({
//         email: $scope.email,
//         password: $scope.password
//       }).then(function(userData){
//         $rootScope.alert.class = 'success';
//         // $rootScope.alert.message = 'Authenticated successfully with payload: ' + userData.uid;
//         $rootScope.loggedIn = true;
//         $window.location.href = 'admin-index.html';
//       }).catch(function(error){
//         if (error = 'INVALID_EMAIL') {
//           $rootScope.alert.class = 'danger';
//           $rootScope.alert.message = 'You have entered an invalid username or password';
//         } else if (error = 'INVALID_PASSWORD') {
//           $rootScope.alert.class = 'danger';
//           $rootScope.alert.message = 'You have entered an invalid password';
//         } else {
//           $rootScope.alert.class = 'danger';
//           $rootScope.alert.message = error;
//         }
//       });
//     };
//   }
// ]);

// // // // let's create a re-usable factory that generates the $firebaseAuth instance
// // // app.factory("Auth", ["$firebaseAuth",
// // //   function($firebaseAuth) {
// // //     var ref = new Firebase("https://jobcenter-id-auth.firebaseio.com");
// // //     return $firebaseAuth(ref);
// // //   }
// // // ]);

// // // and use it in our controller






