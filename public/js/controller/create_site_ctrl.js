'use strict';

/* Controllers */

angular.module('myApp').
    controller('createSiteCtrl', ['$scope', '$location', '$route', '$routeParams',
      '$http', '$log', 'authService', 'AUTH_EVENT', 'USER_ROLES', 'Upload',
      function ($scope, $location, $route, $routeParams, $http, $log, authService,
                AUTH_EVENT, USER_ROLES, Upload) {
        var user = authService.getUser();
        var imageMask = '/img/image_mask.png';

        $scope.site = {
          'title': '',
          'subtitle': '',
          'href': '',
          'intro': '',
          'icon': imageMask
        };

        $scope.upload = function (file) {
          if(file == null){
            return;
          }
          Upload.upload({
            url: '/api/file/upload?token=' + user.token,
            data: {file: file, 'username': 'this is username'}
          }).then(function (resp) {
            $log.debug('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $log.debug(resp.data);
            if(resp.data.errno == 0){
              $scope.site.icon = resp.data.url;
            }
          }, function (resp) {
            //$log.debug('Error status: ' + resp.status);
          }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //$log.debug('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        };

        $scope.create = function(){

          if($scope.site.icon == imageMask){
            alert('请上传站点Icon');
            return;
          }
          $log.debug($scope.site);
          $http.post('/api/site/create?token=' + user.token, $scope.site).
              success(function (data, status, headers, config) {
                if (data.errno === 0) {
                  $log.debug(data);
                  $route.reload();
                } else {
                }
              }).
              error(function (data, status, headers, config) {
              });
        };

      }]);
