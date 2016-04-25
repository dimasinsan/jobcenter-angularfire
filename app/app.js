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
    'ui.router'
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
        templateUrl: 'views/search.html'
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'admin/index.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://jobcenter-id-auth.firebaseio.com/');
