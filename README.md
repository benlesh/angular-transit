angular-transit
===============

A module for AngularJS containing directives for CSS3 animations.

##Usage

###Basic usage

the following will animate the div to `left: 200px` when `$scope.boolExpr == true`;

    <div transit="{ 'boolExpr' : { 'left' : '200px' } }"></div>

### Supports Queueing

If multiple animation expressions are "true" they will be executed one after the other in the order they resolved as true.

### Duration

Duration can be set with `$duration` on the options object:

    <div transit="{
        'boolExpr' : {
            $duration: '4s',
            left: '200px'
        }
        }"></div>

Duration can also be set at the individual property level. The following will animate left to 200px in 4s,
and top to 100px in 1s simultaneously.

     <div transit="{
         'boolExpr' : {
             $duration: '4s',
             left: '200px',
             top: {
                duration: '1s',
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