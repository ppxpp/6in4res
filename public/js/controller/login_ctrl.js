'use strict';

/* Controllers */

angular.module('myApp').
    controller('loginCtrl', ['$scope', '$location',
      '$http', '$log', 'authService', 'AUTH_EVENT', 'USER_ROLES',
      function ($scope, $location, $http, $log, authService, AUTH_EVENT, USER_ROLES) {

        //alert(authService.isAuthenticated());
        //$scope.loading = false;

        //$scope.setLoading(true);
        var user = authService.getUser();
        if(user.role == USER_ROLES.admin) {
          $location.path('/admin');
          return;
        }else if(user.role == USER_ROLES.user){
          $location.path('/res/site/list/1');
          return;
        }
        /*if(authService.isAuthenticated()){
          $location.path('/admin');
        }*/


        var cbLoginFun = function (oInfo, oOpts) {
          alert(oInfo.nickname);
          $scope.credential.type = 'oauth';
          //$scope.credential.openId = oInfo.userId;
          $scope.credential.userName = oInfo.nickname;
        };// 昵称
        QC.Login({
          btnId: "qqLoginBtn"    //插入按钮的节点id
        }, cbLoginFun);

        $scope.userNameError = false;
        $scope.passwordError = false;

        $scope.credential = {
          'userName': 'admin@6able.com',
          'password': 'password',
          'type': 'normal',
          'openId': ''
        };

        $scope.login = function () {
          $scope.userNameError = false;
          $scope.passwordError = false;
          $scope.loading = true;
          authService.login($scope.credential);
        };

        $scope.$on(AUTH_EVENT.loginSuccess, function (event, user) {
          //alert(user.userId);
          //$scope.loading = false;
          if(user.role == USER_ROLES.admin) {
            $location.path('/admin');
          }else if(user.role == USER_ROLES.user){
            $location.path('/res/site/list/1');
          }
        });

        $scope.$on(AUTH_EVENT.userNameNotFound, function(event){
          $scope.userNameError = true;
          //$scope.loading = false;
        });

        $scope.$on(AUTH_EVENT.passwordError, function(event){
          $scope.passwordError = true;
          //$scope.loading = false;
        });

        $scope.$watch('credential', function (oldVal, newVal) {
          if (oldVal !== newVal) {
            $scope.userNameError = false;
            $scope.passwordError = false;
          }
        }, true);


      }]);

