angular-transit v 0.2.0
===============

(c) 2013 Ben Lesh

http://www.benlesh.com

MIT Licensed

A module for AngularJS containing directives for CSS3 animations. The goal of this project is to create a robust toolset
for creating animations from code with AngularJS. **This is currently beta**. I haven't figured out a great way
to end-to-end test this.

Upcoming Releases:

- Support for @keyframes animations
- Legacy browser detection and support (probably in a separate file)
- Chained transitions per trigger. So basically one trigger can add n-transitions to the transit queue.

##Usage

###Basic usage

the following will animate the div to `left: 200px` when `$scope.boolExpr == true`;

    <div transit="{ 'boolExpr' : { 'left' : '200px' } }"></div>

### Supports Queueing

If multiple animation expressions are "true" they will be executed one after the other in the order they resolved as true.

### Duration / Delay

Duration can be set with `$duration` or `$delay` on the transit object:

    <div transit="{
        'boolExpr' : {
            $duration: '4s',
            $delay: '2s',
            left: '200px'
        }
        }"></div>

Duration can also be set at the individual property level. The following will start animating left in .5 seconds, taking
4 seconds to complete the left animation. It will will also wait 6 seconds to animate top to 100px in 1s simultaneously.

     <div transit="{
         'boolExpr' : {
             $duration: '4s',
             $delay: '.5s',
             left: '200px',
             top: {
                duration: '1s',
                delay: '6s',
                value: '100px'
             }
         }
         }"></div>

### Easing

This toolset comes with a list of preset easing timing functions, as well as allowing the developer to specify any
timing function they choose (per CSS3 specs and as browsers allow):

    <div transit="{
        $easing: 'cubic-bezier(.1,0,-2,.25)',
        left: '200px'
    }"></div>

#### Built-in Easing Functions:

There are several built-in easing functions that can be used. These are based off of settings from
[jquery-transit](https://github.com/rstacruz/jquery.transit/blob/master/jquery.transit.js) which seem to be based off
of [Robert Penner's easing functions](http://easings.net/). It should be noted that I changed the names to be less
verbose, however.

Usage of a built-in easing function is as follows:

      <div transit="{
          $easing: 'quintInOut',
          left: '200px'
      }"></div>

#### List of Built-In Easing Functions:

- default: 'ease'
- in: 'ease-in'
- out: 'ease-out'
- inOut: 'ease-in-out'
- snap: cubicBez(0, 1, 0.5, 1)
- cubicOut: cubicBez(0.215, 0.61, 0.355, 1)
- cubicInOut: cubicBez(0.645, 0.045, 0.355, 1)
- circIn: cubicBez(0.6, 0.04, 0.98, 0.335)
- circOut: cubicBez(0.075, 0.82, 0.165, 1)
- circInOut: cubicBez(0.785, 0.135, 0.15, 0.86)
- expoIn: cubicBez(0.95, 0.05, 0.795, 0.035)
- expoOut: cubicBez(0.19, 1, 0.22, 1)
- expoInOut: cubicBez(1, 0, 0, 1)
- quadIn: cubicBez(0.55, 0.085, 0.68, 0.53)
- quadOut: cubicBez(0.25, 0.46, 0.45, 0.94)
- quadInOut: cubicBez(0.455, 0.03, 0.515, 0.955)
- quartIn: cubicBez(0.895, 0.03, 0.685, 0.22)
- quartOut: cubicBez(0.165, 0.84, 0.44, 1)
- quartInOut: cubicBez(0.77, 0, 0.175, 1)
- quintIn: cubicBez(0.755, 0.05, 0.855, 0.06)
- quintOut: cubicBez(0.23, 1, 0.32, 1)
- quintInOut: cubicBez(0.86, 0, 0.07, 1)
- sineIn: cubicBez(0.47, 0, 0.745, 0.715)
- sineOut: cubicBez(0.39, 0.575, 0.565, 1)
- sineInOut: cubicBez(0.445, 0.05, 0.55, 0.95)
- backIn: cubicBez(0.6, -0.28, 0.735, 0.045)
- backOut: cubicBez(0.175, 0.885, 0.32, 10.275)
- backInOut: cubicBez(0.68, -0.55, 0.265, 10.55)

### Events

Events can be handled two ways...

#### $scope.$on with a named transit

Adding a name to your transit allows you to easily handle it in `$scope.$on':

    <div transit=" { $name: 'foo', left: '200px' }"></div>

    $scope.$on('transit:foo:end', function(e) {
        console.log('foo ended!');
    });

#### $end expression evaluation

You can put any expression you'd like evaluated in the $end property of your transit. It's important to note, however,
that it must be in a `string` since it will be evaluated.

    <div transit=" { left: '200px', $end: 'foo()' } "></div>

    $scope.foo = function (){
        console.log('tranit ended!');
    }