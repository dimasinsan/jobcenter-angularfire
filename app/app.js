'use strict';

/**
 * @ngdoc overview
 * @name mainApp
 * @description
 * # mainApp
 *
 * Main module of the application.
 */
angular
  .module('mainApp', [
    'firebase',
    'ui.router',
    'dbApp'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'views/contact-us.html'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'search/search.html'
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('admin');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('admin', {
        url: '/admin',
        controller: 'AdminCtrl as adminCtrl',
        templateUrl: 'admin/admin-landing.html',
        resolve: {
          admin: function(Admin){
            return Admin.$loaded();
          },
          profile: function($state, Users, Auth){
            return Auth.$requireAuth().then( function(auth){
              return Users.getProfile(auth.uid).$loaded().then( function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('admin-profile');
                }
              });
            }, function(error){
              $state.go('login');
            });
          }
        }
      })      
      .state('admin-list', {
        url: '/admin-list',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'admin/admin-list.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('workerprof', {
        url: '/workerprof',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-workerprof.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
          }
        }
      })
      .state('add-workers', {
        url: '/add-workers',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-workerprof-add.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
          }
        }
      })
      .state('offices', {
        url: '/offices',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-offices.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
          }
        }
      })
      .state('add-offices', {
        url: '/add-offices',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-offices-add.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              return;
            }, function(error){
              $state.go('login');
            });
          }
        }
      })
      .state('admin-profile', {
        url: '/admin-profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'admin/admin-edit.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://jobcenter-id-auth.firebaseio.com/');
