ng-async
========

Angular.js asynchronous value service: `$async`

## Getting Started

#### JavaScript

```js
var exampleApp = angular.module('exampleApp', ['ng.async']);

exampleApp.controller('exampleCtrl', function ($scope, $async) {
  
  /**
   * $scope.name will be set to NPH
   */
  $async($scope, 'name', function (resolve) {
    resolve('Neil Patrick Harris');
  });
  
});
```

#### HTML Template

```html
<html ng-app="exampleApp">
  <body>
    <div ng-controller="exampleCtrl">
      <p>Dr. Horrible is played by {{name}}.</p>
    </div>
  </body>
</html>
```

#### Result

    Dr. Horrible is played by Neil Patrick Harris.

## `$async` API

The preferred way to use `$async` is to call it with a scope and an object
mapping property names to resolve functions:

```js
$async(scope, {
  var1: function (resolve) { resolve("value1"); },
  var2: function (resolve) { resolve("value2"); }
});

console.log(scope.var1); // value1
```

There is also an alternative format for providing a single property name as a
string:

```js
$async(scope, 'var3', function (resolve) {
  resolve("value3");
});

console.log(scope.var3); // value3
```

### Placeholder values

The resolve functions may also `return` a value, this will be the value of
`scope.var` before `resolve()` is called.

Example:

```js
var data = {};

$async(data, 'stockPrice', function (resolve) {
  $timeout(function () {
    resolve(123.45);
  }, 1000);
  
  return 'unknown';
});

console.log('Stock price:', data.stockPrice);   // unknown

setTimeout(function () {
  console.log('Stock price:', data.stockPrice); // 123.45
}, 1100);
```

### Use with `$http`

It's easy to use `$async` and `$http` together. A big advantage is that the
developer does not need to keep track of which HTTP requests should be made
based on the current view - that happens automatically.

#### JavaScript

```js
var exampleApp = angular.module('exampleApp', ['ng.async']);

exampleApp.controller('exampleCtrl', function ($scope, $async) {
  
  /**
   * Assuming user.json is {"name": "Barack Obama"}
   */
  $async($scope, 'user', function (resolve) {
    $http.get('user.json').success(resolve);
  });
  
});
```

#### HTML Template

```html
<html ng-app="exampleApp">
  <body>
    <div ng-controller="exampleCtrl">
      <p>The president of the United States is {{user.name}}.</p>
    </div>
  </body>
</html>
```

#### Result

    The president of the United States is Barack Obama.
