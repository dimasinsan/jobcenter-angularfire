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
        templateUrl: 'auth/login.html'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'admin/admin-prof.html'
      })      
      .state('adminprof', {
        url: '/adminprof',
        templateUrl: 'admin/admin-prof.html'
      })
      .state('workerprof', {
        url: '/workerprof',
        templateUrl: 'admin/admin-workerprof.html'
      })
      .state('offices', {
        url: '/offices',
        templateUrl: 'admin/admin-offices.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://jobcenter-id-auth.firebaseio.com/');
