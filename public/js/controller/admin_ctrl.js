'use strict';

/* Controllers */

angular.module('myApp').
    controller('adminCtrl', ['$scope', '$location', '$routeParams',
      '$http', '$log', 'authService', 'AUTH_EVENT', 'USER_ROLES',
      function ($scope, $location, $routeParams, $http, $log, authService, AUTH_EVENT, USER_ROLES) {

        var page = typeof($routeParams.page) == 'undefined' ? 1 : $routeParams.page;

        $scope.itemsPerPage = 7;
        $scope.maxSize = 3;
        $scope.totalItems = 700;
        $scope.currentPage = 4;


        $log.debug('curt page = ' + page);

        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
          $log.debug('Page changed to: ' + $scope.currentPage);
        };




      }]);
