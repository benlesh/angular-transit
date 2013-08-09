/*
 * Author: Ben Lesh (c) 2013
 * MIT Licensed
 */
(function(window, angular) {
  var module = angular.module('transit', []),
    directive = module.directive,
    forEach = angular.forEach;
  
  directive('transit', function(){
    return function(scope, elem, attrs) {
      var origJson = attrs.transit,
          data = scope.$eval(origJson),
          doTrans = function(trans) {
            elem.transition(trans);
          };
          
      if(data) {
        forEach(data, function(trans, expr) {
          scope.$watch(expr, function(val) {
              if(val) {
                var temp = scope.$eval(origJson);
                trans = temp[expr];
                if(angular.isArray(trans)) {
                  forEach(trans, doTrans);
                }else{
                  doTrans(trans);
                }
              }
            });
        });
       
      }
    };
  });
  
  directive('transitInit', function (){
    return function(scope, elem, attrs) {
      elem.css(scope.$eval(attrs.transitInit));
    };
  });
})(window, window.angular);
