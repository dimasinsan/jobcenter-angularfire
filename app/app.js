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
        controller: 'HomeCtrl as homeCtrl',
        templateUrl: 'views/home.html'
      })
      .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'views/contact-us.html'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'search/search.html',
        controller: 'searchController'
      })
      .state('profiles', {
        url: '/profiles',
        controller: 'HomeCtrl as homeCtrl',
        templateUrl: 'profiles/workerprofile.html'
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
      .state('reset-password', {
        url: '/reset-password',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/reset-password.html'
      })
      .state('admin', {
        url: '/admin',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'dashboard/admin-landing.html',
        resolve: {
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
      .state('workerprof', {
        url: '/workerprof',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-workerprof.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
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
      .state('add-workers', {
        url: '/add-workers',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-workerprof-add.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
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
      .state('offices', {
        url: '/offices',
        controller: 'searchController',
        templateUrl: 'admin/admin-offices.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
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
      .state('admin-profile', {
        url: '/admin-profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'admin/admin-profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
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
      .state('branch-edit', {
        url: '/branch-edit/:branchId',
        controller: 'searchController',
        templateUrl: 'admin/branch-edit.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
          }          
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
       })
      
      .state('admin-add', {
        url: '/admin-add',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/admin-add.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
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
        controller: 'AdminCtrl as adminCtrl',
        templateUrl: 'admin/admin-list.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
          },
          adminList: function($state, Users){
            return Users.all.$loaded();
          }
        }
      });  
    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://jobcenter-id-auth.firebaseio.com/');
