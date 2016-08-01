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
    
    // Front page UI Routes
      .state('home', {
        url: '/',
        controller: 'searchController',
        templateUrl: 'views/home.html'
      })
      .state('underconstruction', {
        url: '/underconstruction',
        //controller: 'searchController',
        templateUrl: 'views/undercons.html'
      })
      .state('home-en', {
        url: '/en',
        controller: 'searchController',
        templateUrl: 'views/home-en.html'
      })
      .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'views/contact-us.html',
        //controller: 'branchViewController'
      })
      .state('homie', {
        url: '/:workerId',
        templateUrl: 'views/home.html',
        controller: 'searchController'
      })
      .state('homien', {
        url: '/en/:workerId',
        templateUrl: 'views/home-en.html',
        controller: 'searchController'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'search/search.html',
        controller: 'searchController'
      })
      .state('profiles', {
        url: '/profiles/:workerId',
        controller: 'profileViewController',
        templateUrl: 'profiles/workerprofile.html'
      })
      .state('terms', {
        url: '/terms',
        templateUrl: 'profiles/terms-conditions.html'
      })
    // END Front page UI Routes  
   
    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://jobcenter-id-auth.firebaseio.com/');
