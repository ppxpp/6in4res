'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    value('version', '0.1');

angular.module('myApp.services', ['ngCookies'])
    .factory('authService', ['$rootScope', '$http', '$cookies', '$log', 'AUTH_EVENT', 'USER_ROLES',
      function ($rootScope, $http, $cookies, $log, AUTH_EVENT, USER_ROLES) {

        var user = {
          userId: '',
          userName: '',
          role: USER_ROLES.guest,
          token: ''
        };

        readUser();

        function resetUser() {
          updateUser('', '', USER_ROLES.guest, '');
        };

        function readUser() {
          //var cached_user = JSON.parse($cookies.cached_user);
          var tmp = $cookies.getObject('user');
          //console.log(tmp);
          if (tmp != null) {

            var id = tmp.userId || '';
            var name = tmp.userName || '';
            var role = tmp.role || USER_ROLES.guest;
            var token = tmp.token || '';
            //console.log(id + ',' + name + ',' + role + ',' + token);
            updateUser(id, name, role, token);
          }
          /*console.log('cached_user = ' + cached_user);
          if(cached_user != null){
            console.log('update user');
            updateUser(cached_user.userId, cached_user.userName, cached_user.role, cached_user.token);
          }else{
            console.log('lll');
          }*/
        };

        function updateUser(userId, userName, role, token) {
          user.userId = userId;
          user.userName = userName;
          user.role = role;
          user.token = token;
          /*$cookies.id = user.userId;
          $cookies.name = user.userName;
          $cookies.role = user.role;
          $cookies.token = user.token;*/
          $cookies.putObject('user', user);
          //console.log('write user ' + user);
        };

        var authService = {};

        authService.isAuthenticated = function () {
          return true;//user.role == USER_ROLES.guest;
        };

        authService.isAuthorized = function (authorizedRoles) {
          if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
          }
          //console.log('user role = ' + user.role);
          //console.log(authorizedRoles.indexOf(user.role));
          //console.log(authorizedRoles.indexOf(USER_ROLES.all));
          var authorized = authorizedRoles.indexOf(user.role) !== -1;
          if(!authorized){
            authorized = authorizedRoles.indexOf(USER_ROLES.all) !== -1;
          }
          return authService.isAuthenticated() && authorized;
        };


        authService.login = function (credentials) {
          $http.post('/api/account/login', credentials).
              success(function (data, status, headers, config) {
                if (data.errno === 0) {
                  $log.debug(data);
                  //$location.path('/admin');
                  updateUser(data.userId, data.userName, data.role, data.token);
                  $rootScope.$broadcast(AUTH_EVENT.loginSuccess, user);
                } else if (data.errno == 1) {
                  //用户名找不到
                  resetUser();
                  //$scope.userNameError = true;
                  $rootScope.$broadcast(AUTH_EVENT.userNameNotFound);

                } else if (data.errno == 2) {
                  //密码错误
                  resetUser();
                  //$scope.passwordError = true;
                  $rootScope.$broadcast(AUTH_EVENT.passwordError);
                }
              }).
              error(function (data, status, headers, config) {
                console.log('login error');
              });
        };

        authService.logout = function(){
          resetUser();
          $rootScope.$broadcast(AUTH_EVENT.logoutSuccess);
        };

        authService.getUser = function(){
          return user;
        };

        return authService;

      }]);
