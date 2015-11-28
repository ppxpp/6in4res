'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }).
  filter('siteState', function () {
    return function (text) {
      if(text == 'uncheck'){
        return '等待审核';
      }else if(text = 'pass'){
        return '已通过';
      }else if (text == 'reject'){
        return '已拒绝';
      }
      return text;
    };
  }).
  filter('appState', function () {
    return function (text) {
      if(text == 'uncheck'){
        return '等待审核';
      }else if(text = 'pass'){
        return '已通过';
      }else if (text == 'reject'){
        return '已拒绝';
      }
      return text;
    };
  });
