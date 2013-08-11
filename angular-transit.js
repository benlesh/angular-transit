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
        var nameCounter = 0,
            cubicBez = function (a, b, c, d) {
                return 'cubic-bezier(' + [a, b, c, d].join(',') + ')';
            },
            easingTypes = {
                'in': 'ease-in',
                'out': 'ease-out',
                'inOut': 'ease-in-out',
                'snap': cubicBez(0, 1, 0.5, 1),
                'cubicOut': cubicBez(0.215, 0.61, 0.355, 1),
                'cubicInOut': cubicBez(0.645, 0.045, 0.355, 1),
                'circIn': cubicBez(0.6, 0.04, 0.98, 0.335),
                'circOut': cubicBez(0.075, 0.82, 0.165, 1),
                'circInOut': cubicBez(0.785, 0.135, 0.15, 0.86),
                'expoIn': cubicBez(0.95, 0.05, 0.795, 0.035),
                'expoOut': cubicBez(0.19, 1, 0.22, 1),
                'expoInOut': cubicBez(1, 0, 0, 1),
                'quadIn': cubicBez(0.55, 0.085, 0.68, 0.53),
                'quadOut': cubicBez(0.25, 0.46, 0.45, 0.94),
                'quadInOut': cubicBez(0.455, 0.03, 0.515, 0.955),
                'quartIn': cubicBez(0.895, 0.03, 0.685, 0.22),
                'quartOut': cubicBez(0.165, 0.84, 0.44, 1),
                'quartInOut': cubicBez(0.77, 0, 0.175, 1),
                'quintIn': cubicBez(0.755, 0.05, 0.855, 0.06),
                'quintOut': cubicBez(0.23, 1, 0.32, 1),
                'quintInOut': cubicBez(0.86, 0, 0.07, 1),
                'sineIn': cubicBez(0.47, 0, 0.745, 0.715),
                'sineOut': cubicBez(0.39, 0.575, 0.565, 1),
                'sineInOut': cubicBez(0.445, 0.05, 0.55, 0.95),
                'backIn': cubicBez(0.6, -0.28, 0.735, 0.045),
                'backOut': cubicBez(0.175, 0.885, 0.32, 10.275),
                'backInOut': cubicBez(0.68, -0.55, 0.265, 10.55)
            };

        function getEasing(easing) {
            if (!easing) {
                return 'ease';
            }
            return easingTypes[easing] || easing;
        }

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
                    } else {
                        currentTransit = null;
                    }
                }
            });

            forEach(transitionSet, function (transition, expr) {
                var name = transition.$name || 'transit_' + nameCounter++,
                    end = transition.$end,
                    duration = transition.$duration || '1s',
                    easing = getEasing(transition.$easing),
                    delay = transition.$delay || '0s',
                    transVal = '',
                    css = {},
                    cssProps = [];

                window.console.log(easing);

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