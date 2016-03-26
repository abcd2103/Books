/**
 * 
 */
var services = angular.module('bookweb.services', ['ngResource', 'ngRoute']);

/*
 * Services for Book
 * 
 */
services.factory('Book', ['$resource', function ($resource) {
    return $resource('/book/:id', {
        id: '@id'
    });
}]);

/*
 * Services for Author
 * 
 */
services.factory('Author', ['$resource', function ($resource) {
    return $resource('/author/:id', {
        id: '@id'
    });
}]);

/*
 * Services for Series
 * 
 */
services.factory('Series', ['$resource', function ($resource) {
    return $resource('/series/:id', {
        id: '@id'
    });
}]);

/*
 * Database List Service
 */
services.factory('dbListService', ['$http', '$route', '$q', function ($http, $route, $q) {
    var dbListService = {};
    dbListService.findAll = function () {
        var delay = $q.defer();
        $http({
            method: "GET"
            , url: "/dbList"
        }).success(function (data) {
            delay.resolve(data);
        }).error(function (msg, code) {
            delay.reject("Unable to fetch dbList" + msg);
        });

        return delay.promise;
    };
    return dbListService;
}]);

services.factory('sharedData', function () {
    var sharedData = {
        dbName: {
            "name": "children"
        }
    };
    return sharedData;
});

services.factory('dbListInterceptor', ["$q", "$rootScope", "$injector", "$log", 'sharedData', function ($q, $rootScope, $injector, $log, sharedData) {
    return {
        request: function (config) {
            config.params = config.params || {};
            config.params.dbName = sharedData.dbName.name;
            return config;
        }

    };

}]);