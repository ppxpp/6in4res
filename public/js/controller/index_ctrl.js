'use strict';

/* Controllers */

angular.module('myApp').
    controller('indexCtrl', ['$scope', '$location',
      '$http', '$log', 'authService', 'AUTH_EVENT', 'USER_ROLES',
      function ($scope, $location, $http, $log, authService, AUTH_EVENT, USER_ROLES) {

        $scope.USER_ROLES = USER_ROLES;

        $scope.user = authService.getUser();

        /**
         * 判断哪个菜单被选中
         * @param menuItem
         */
        $scope.checkSelection = function(menuItem){
          var url = $location.url();
          //console.log('meunItem = ' + menuItem + ', url = ' + url);
          if(url.indexOf('/admin') == 0 && menuItem == 'check_site_undo'){
            return true;
          }else if(url.indexOf('/check/site/done') == 0 && menuItem == 'check_site_done'){
            return true;
          }else if(url.indexOf('/check/site/undo') == 0 && menuItem == 'check_site_undo'){
            return true;
          }else if(url.indexOf('/check/app/done') == 0 && menuItem == 'check_app_done'){
            return true;
          }else if(url.indexOf('/check/app/undo') == 0 && menuItem == 'check_app_undo'){
            return true;
          }else if(url.indexOf('/res/site/list') == 0 && menuItem == 'my_sites'){
            return true;
          }else if(url.indexOf('/res/site/create') == 0 && menuItem == 'create_site'){
            return true;
          }else if(url.indexOf('/res/app/create') == 0 && menuItem == 'create_app'){
            return true;
          }else if(url.indexOf('/res/site/list') == 0 && menuItem == 'my_sites'){
            return true;
          }else if(url.indexOf('/res/app/list') == 0 && menuItem == 'my_apps'){
            return true;
          }else if(url.indexOf('/app/my/detail') == 0 && menuItem == 'my_apps'){
            return true;
          }
          return false;
        };

        $scope.checkMenuVisible = function(menuItem){
          var role = $scope.user.role;
          //$log.debug('role = ' + role);
          //console.log('meunItem = ' + menuItem + ', url = ' + url);
          var visibleItems = null;
          if(role == USER_ROLES.admin){
            visibleItems = ['check_site_done',
                                'check_site_undo',
                                'check_site_title',
                                'check_app_done',
                                'check_app_undo',
                                'check_app_title'];
          }

          if(role == USER_ROLES.user){
            visibleItems = ['create_site',
              'my_sites',
                'site_title',
              'create_app',
              'my_apps',
                'app_title'];
          }
          //$log.debug(visibleItems);
          for(var i = 0; visibleItems != null && i < visibleItems.length; i++){
            if(visibleItems[i] == menuItem){
              return true;
            }
          }
          return false;
        };

        $scope.isAuthorized = function(roles){
          return authService.isAuthorized(roles);
        };

        $scope.logout = function(){
          authService.logout();
        };

        $scope.$on(AUTH_EVENT.logoutSuccess, function(event){
          //$scope.loading = false;
          $location.path('/login');
        });

      }]);

