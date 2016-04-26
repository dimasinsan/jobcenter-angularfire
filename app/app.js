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
    'angular-md5',
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
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-landing.html',
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
      .state('admin-list', {
        url: '/admin-list',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-prof.html',
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
      .state('workerprof', {
        url: '/workerprof',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-workerprof.html',
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
      .state('offices', {
        url: '/offices',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-offices.html',
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
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-prof-add.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              return;
            }, function(error){
              $state.go('login');
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://jobcenter-id-auth.firebaseio.com/');
