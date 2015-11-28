'use strict';

/* Directives */

angular.module('myApp.directives', []).
  /*directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }).*/
  directive('btnLoading', function(){
      return {
        restrict: 'A',
        replace: true,
        transclude: false,
        link: function(scope, element, attr){
          /*scope.setLoading = function(isLoading){
            if(isLoading == true){
              element.button('loading');
            }else{
              element.button('reset');
            }
          }*/
        }
      }
    });
