'use strict';

/* Controllers */

angular.module('myApp').
    controller('createAppCtrl', ['$scope', '$location', '$route', '$routeParams',
      '$http', '$log', 'authService', 'AUTH_EVENT', 'USER_ROLES', 'Upload',
      function ($scope, $location, $route, $routeParams, $http, $log, authService,
                AUTH_EVENT, USER_ROLES, Upload) {

        var user = authService.getUser();

        var imageMask = '/img/image_mask.png';

        $scope.screenshots = new Array();
        $scope.screenshots[0] = imageMask;
        $scope.screenshots[1] = imageMask;
        $scope.screenshots[2] = imageMask;
        $scope.apkName = '';
        $scope.app = {
          'name': '',
          'version': '',
          'description': '',
          'package': '',
          'size': 0,
          'screenshots':[],
          'icon': imageMask,
          'apk': ''
        };

        $scope.apkPercent = 0;

        $scope.upload = function(index, file) {
          if(file == null){
            return;
          }
          $log.debug(file);
          //return;
          if(index == 4){
            $scope.apkPercent = 0;
          }
          Upload.upload({
            url: '/api/file/upload?token='+ user.token,
            data: {file: file, 'username': 'this is username'}
          }).then(function (resp) {
            $log.debug('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $log.debug(resp.data);
            if(resp.data.errno == 0){
              if(index == 4){
                //apk file
                $scope.apkPercent = 0;
                $scope.app.apk = resp.data.url;
                $scope.apkName = file.name;
                var size = parseInt(resp.data.size / 1024);
                if(size == 0) {
                  size = 1;
                }
                $scope.app.size = size;
              }else if(index == 3){
                //icon
                $scope.app.icon = resp.data.url;
              }else{
                //screenshot
                $scope.screenshots[index] = resp.data.url;
              }
            }
          }, function (resp) {
            //$log.debug('Error status: ' + resp.status);
          }, function (evt) {
            if (index == 4) {
              $scope.apkPercent = parseInt(100.0 * evt.loaded / evt.total);
              $log.debug("progress: " + $scope.apkPercent);
            }
            //$log.debug('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        };

        $scope.create = function(){

          if($scope.app.icon == imageMask){
            alert('请上传APP图标');
            return;
          }
          if($scope.app.apk == ''){
            alert('请上传安装包文件');
            return;
          }
          if($scope.screenshots[0] == imageMask
              || $scope.screenshots[1] == imageMask
              || $scope.screenshots[2] == imageMask){
            alert('请上传APP截图');
            return;
          }
          $scope.app.screenshots = $scope.screenshots;
          $log.debug($scope.app);
          $http.post('/api/app/create?token=' + user.token, $scope.app).
              success(function (data, status, headers, config) {
                if (data.errno === 0) {
                  $log.debug(data);
                  alert('提交成功');
                  $route.reload();
                } else {
                }
              }).
              error(function (data, status, headers, config) {
              });
        };

      }]);
