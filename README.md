angular-transit
===============

(c) 2013 Ben Lesh
http://www.benlesh.com
MIT Licensed

A module for AngularJS containing directives for CSS3 animations. The goal of this project is to create a robust toolset
for creating animations programmatically with AngularJS.

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