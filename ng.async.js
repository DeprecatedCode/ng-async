/**
 * ng.async
 * 
 * Author : Nate Ferrero
 * License: MIT
 * Version: 0.0.1
 * 
 * This Angular.js module provides the $async angular service, which allows
 * template variables to trigger a function to perform asyncronous operations.
 * 
 * Usage:
 * 
 *  $async(scope, {
 *    var: function (resolve) { ... },
 *    var2: function (resolve) { ... }
 *  });
 *
 * Alternative:
 *
 *  $async(scope, 'var', function (resolve) { ... });
 */
(function (angular) {
  
  /**
   * Error message if $async is used incorrectly
   */
  var usage = 'Usage: $async(scope, {var: function (resolve) { ... }});';
  
  var async;

  var module = angular.module('ng.async', []);

  /**
   * Setup the async wrapper
   */
  module.run(function ($q) {
    async = function (fn) {
      if (typeof fn !== 'function') {
        throw new Error(usage);
      }
      
      var cache;
      var deferred;
      
      /**
       * Getter function
       * Automatically called once when data is needed
       */
      return function () {
        
        if (deferred === undefined) {
          deferred = $q.defer();
          
          deferred.promise.then(function (value) {
            cache = value;
          });
        
          cache = fn(deferred.resolve);
        }
        
        return cache;
      };
    };
  });

  /**
   * $async service
   */
  module.value('$async', function (scope, property, fn) {
    if (typeof scope !== 'object' || scope === null) {
      throw new Error('First argument to $async must be an object');
    }
    if (typeof property === 'object' && property !== null) {
      if (fn !== undefined) {
        throw new Error(usage);
      }
      Object.keys(property).forEach(function (prop) {
        scope.__defineGetter__(prop, async(property[prop]));
      });
    }
    else if (typeof property === 'string') {
      scope.__defineGetter__(property, async(fn));
    }
    else {
      throw new Error(usage);
    }
  });

})(angular);
