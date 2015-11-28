'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('myApp', [
  'ngRoute',
  'ngFileUpload',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.bootstrap'
]).
    config(function ($routeProvider, $locationProvider, USER_ROLES) {
      $routeProvider.
          when('/', {
            /*templateUrl: 'partials/partial1',
             controller: 'indexCtrl'*/
            redirectTo: '/login'
          }).
          when('/login', {
            templateUrl: 'partials/account/login',
            controller: 'loginCtrl',
            data: {
              roles: [USER_ROLES.all]
            }
          }).
          when('/admin', {
            data: {
              roles: [USER_ROLES.admin]
            },
            redirectTo: '/check/site/undo/1'
          }).
        //未审核的站点
          when('/check/site/undo/:page', {
            templateUrl: 'partials/site_undo',
            controller: 'siteUndoCtrl',
            data: {
              roles: [USER_ROLES.admin]
            }
          }).
          when('/check/site/undo', {
            redirectTo: '/check/site/undo/1'
          }).
        //已审核的站点
          when('/check/site/done/:page', {
            templateUrl: 'partials/site_done',
            controller: 'siteDoneCtrl',
            data: {
              roles: [USER_ROLES.admin]
            }
          }).
          when('/check/site/done', {
            redirectTo: '/check/site/done/1'
          }).
        //未审核的APP
          when('/check/app/undo/:page', {
            templateUrl: 'partials/app_undo',
            controller: 'appUndoCtrl',
            data: {
              roles: [USER_ROLES.admin]
            }
          }).
          when('/check/app/undo', {
            redirectTo: '/check/app/undo/1'
          }).
          when('/check/app/undo/detail/:id', {
            templateUrl: 'partials/app_detail',
            controller: 'appDetailCtrl',
            data: {
              roles: [USER_ROLES.admin]
            }
          }).
          when('/check/app/undo/detail', {
            redirectTo: '/check/app/undo/1'
          }).
        //已审核的APP
          when('/check/app/done/:page', {
            templateUrl: 'partials/app_done',
            controller: 'appDoneCtrl',
            data: {
              roles: [USER_ROLES.admin]
            }
          }).
          when('/check/site/done', {
            redirectTo: '/check/app/done/1'
          }).
          when('/check/app/done/detail/:id', {
            templateUrl: 'partials/app_detail',
            controller: 'appDetailCtrl',
            data: {
              roles: [USER_ROLES.admin]
            }
          }).
          when('/check/app/done/detail', {
            redirectTo: '/check/app/undo/1'
          }).
          //我提交的站点
          when('/res/site/list/:page', {
            templateUrl: 'partials/my_sites',
            controller: 'mySitesCtrl',
            data: {
              roles: [USER_ROLES.user]
            }
          }).
          when('/res/site/list', {
            redirectTo: '/res/site/list/1'
          }).
          //提交新站点
          when('/res/site/create',{
            templateUrl: 'partials/create_site',
            controller: 'createSiteCtrl',
            data: {
              roles: [USER_ROLES.user]
            }
          }).
        //我提交的APP
          when('/res/app/list/:page', {
            templateUrl: 'partials/my_apps',
            controller: 'myAppsCtrl',
            data: {
              roles: [USER_ROLES.user]
            }
          }).
          when('/res/app/list', {
            redirectTo: '/res/app/list/1'
          }).
          when('/app/my/detail/:id', {
            templateUrl: 'partials/app_detail',
            controller: 'appDetailCtrl',
            data: {
              roles: [USER_ROLES.user]
            }
          }).
          when('/app/my/detail', {
            redirectTo: '/app/my/detail/1'
          }).
          //提交新APP
          when('/res/app/create',{
            templateUrl: 'partials/create_app',
            controller: 'createAppCtrl',
            data: {
              roles: [USER_ROLES.user]
            }
          }).
        //其他情况
          otherwise({
            redirectTo: '/res/site/checked'
          });

      //$locationProvider.html5Mode(true);
    });

//检查路由变化

app.run(['$rootScope', '$location', '$log', 'authService', 'AUTH_EVENT',
  function ($rootScope, $location, $log, authService, AUTH_EVENT) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      var roles = next.data.roles;
      if (!authService.isAuthorized(roles)) {
        event.preventDefault();
        if (authService.isAuthenticated()) {
          // user is not allowed
          $log.debug('user role is not allowed');
          $rootScope.$broadcast(AUTH_EVENT.notAuthorized);
          //$location.path('/login');
        } else {
          // user is not logged in
          $rootScope.$broadcast(AUTH_EVENT.notAuthenticated);
          $location.path('/login');
        }
      }
    });
  }]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
});
app.factory('AuthInterceptor',
    function ($rootScope, $q, AUTH_EVENT) {
      return {
        responseError: function (response) {
          $rootScope.$broadcast({
            401: AUTH_EVENT.notAuthenticated,
            403: AUTH_EVENT.notAuthorized
          }[response.status], response);
          return $q.reject(response);
        }
      };
    });

//配置常量
app.constant('AUTH_EVENT', {
  loginSuccess: 'auth-login-success',
  passwordError: 'auth-password-error',
  userNameNotFound: 'auth-username-not-found',
  loginTimeout: 'auth-login-timeout',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized',
  logoutSuccess: 'auth-logout-success'
});
app.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  developer: 'developer',
  user: 'user',
  guest: 'guest'
});




















