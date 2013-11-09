ng-async
========

Angular.js asynchronous value service: `$async`

## Example

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

## Usage

The preferred way to use `$async` is to give it a scope and an object containing resolve functions:

```js
$async(scope, {
  var1: function (resolve) { resolve("value"); },
  var2: function (resolve) { resolve("value2"); }
});
```

There is also an alternative format for providing a single property:

```js
$async(scope, 'var3', function (resolve) { resolve("value3"); });
```

The resolve functions may also return a value, this will be the value of `scope.var` before `resolve()` is called.

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