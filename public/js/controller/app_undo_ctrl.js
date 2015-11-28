'use strict';

/* Controllers */

angular.module('myApp').
    controller('appUndoCtrl', ['$scope', '$location', '$routeParams',
      '$http', '$log', '$uibModal', 'authService', 'AUTH_EVENT', 'USER_ROLES',
      function ($scope, $location, $routeParams, $http, $log, $uibModal, authService, AUTH_EVENT, USER_ROLES) {

        var page = typeof($routeParams.page) == 'undefined' ? 1 : $routeParams.page;
        $scope.user = authService.getUser();

        $scope.itemsPerPage = 5;
        $scope.maxSize = 5;
        $scope.totalItems = page * $scope.itemsPerPage;
        $scope.currentPage = page;

        $scope.items = null;

        loadData();

        $scope.pageChanged = function() {
          $log.debug('Page changed to: ' + $scope.currentPage);
          loadData();
        };

        $scope.action = function(index, action){
          //$log.debug(index);
          //$log.debug('action = ' + action);
          var item = $scope.items[index];
          //$log.debug(item);
          var postData = {
            'token': $scope.user.token,
            'id': item.id.toString(),
            'action': (action == 0 ? 'pass' : 'reject')
          };
          $http.post('/api/check/site/action', postData).
              success(function (data, status, headers, config) {
                //$log.debug(data);
                if (data.errno === 0) {
                  //$location.path('/admin');
                  $scope.items.splice(index, 1);
                }
              }).
              error(function (data, status, headers, config) {
                console.log('error');
              });
        };

        function loadData(){
          $http({
            url:'/api/check/app/undo',
            method:'GET',
            params:{
              'page': $scope.currentPage,
              'pageSize': $scope.itemsPerPage,
              'token':$scope.user.token
            }
          }).success(function(data,header,config,status){
            //响应成功
            $log.debug(data);
            if(data.errno == 0){
              $scope.totalItems = data.data.total;
              $scope.items = data.data.items;
            }
          }).error(function(data,header,config,status){
            //处理响应失败
            $log.debug(data);
          });
        };


      }]);
