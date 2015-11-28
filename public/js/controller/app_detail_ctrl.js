'use strict';

/* Controllers */

angular.module('myApp').
    controller('appDetailCtrl', ['$scope', '$location', '$routeParams',
      '$http', '$log', '$uibModal', 'authService', 'AUTH_EVENT', 'USER_ROLES',
      function ($scope, $location, $routeParams, $http, $log, $uibModal, authService, AUTH_EVENT, USER_ROLES) {

        var user = authService.getUser();
        $scope.isAdmin = false;

        if(user.role == USER_ROLES.admin){
          $scope.isAdmin = true;
        }

        var id = $routeParams.id || 1;
        $log.debug('id = ' + id);

        $scope.user = authService.getUser();
        $scope.item = null;

        loadData();
        function loadData(){
          $http({
            url:'/api/check/app/detail',
            method:'GET',
            params:{
              'id': id,
              'token':$scope.user.token
            }
          }).success(function(data,header,config,status){
            //响应成功
            $log.debug(data);
            if(data.errno == 0){
              $scope.item = data.item;
            }else{
              //$location.path("/check/app/undo/1");
            }
          }).error(function(data,header,config,status){
            //处理响应失败
          });
        };

        $scope.action = function(action){
          $log.debug('action = ' + action);
          //$log.debug(item);
          var postData = {
            'token': $scope.user.token,
            'id': id,
            'action': (action == 0 ? 'pass' : 'reject')
          };
          $http.post('/api/check/app/action', postData).
              success(function (data, status, headers, config) {
                $log.debug(data);
                if (data.errno === 0) {
                  if ($scope.isAdmin) {
                    $location.path('/check/app/undo/1');
                  }else{
                    $location.path('/res/app/list/1');
                  }
                }
              }).
              error(function (data, status, headers, config) {
                console.log('error');
              });
        };


      }]);
