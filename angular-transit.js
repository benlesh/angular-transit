(function (window, angular) {
    var module = angular.module('transit', []),
        directive = module.directive,
        forEach = angular.forEach,
        isObject = angular.isObject,
        extend = angular.extend;

    //made to remove all instances of an item from an array.
    function remove(arr, item) {
        for (var i = arr.length; i--;) {
            if (arr[i] === item) {
                arr.splice(i, 1);
            }
        }
    }

    directive('transit', function () {
        var nameCounter = 0;

        return function (scope, elem, attrs) {
            var optionsStr = attrs.transit,
                transitionSet = scope.$eval(optionsStr) || {},
                transitQueue = [],
                currentTransit;

            elem.bind('transitionend', function (e) {
                var cssProps = currentTransit.cssProps,
                    name = currentTransit.name,
                    end = currentTransit.end;
                remove(cssProps, e.propertyName);
                if (cssProps.length === 0) {
                    scope.$broadcast('transit:' + name + ':end');
                    if (end) {
                        scope.$apply(end);
                    }
                    if (transitQueue.length > 0) {
                        currentTransit = transitQueue.shift();
                        elem.css(currentTransit.css);
                    }
                }
            });

            forEach(transitionSet, function (transition, expr) {
                var name = transition.$name || 'transit_' + nameCounter++,
                    end = transition.$end,
                    duration = transition.$duration || '1s',
                    easing = 'linear',
                    delay = transition.$delay || '0s',
                    transVal = '',
                    css = {},
                    cssProps = [];

                forEach(transition, function (val, key) {
                    if (key[0] !== '$') {
                        var style = {
                            duration: duration,
                            easing: easing,
                            delay: delay
                        };
                        if (isObject(val)) {
                            extend(style, val);
                            val = val.value;
                        }
                        var styleStr = [key, style.duration, style.easing, style.delay].join(' ');
                        transVal += (transVal ? ', ' : '') + styleStr;
                        css[key] = val;
                        cssProps.push(key);
                    }
                });

                css.transition = transVal;


                scope.$watch(expr, function (val) {
                    if (val) {
                        var transit = {
                            name: name,
                            css: css,
                            end: end,
                            cssProps: cssProps
                        };
                        if (!currentTransit) {
                            currentTransit = transit;
                            elem.css(css);
                        } else {
                            transitQueue.push(transit);
                        }
                    }
                });

            });
        };
    });
})(window, window.angular);