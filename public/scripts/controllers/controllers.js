/**
 * 
 */
var bookApp = angular.module('bookApp', ['bookweb.services', 'ngSanitize']);

bookApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    /*
     * Routes for Books
     * 
     */
    $routeProvider.when('/', {
        controller: 'BookListCtrl'
        , templateUrl: 'views/bookList.html'
    }).when('/view/:bookId', {
        controller: 'BookViewCtrl'
        , templateUrl: 'views/bookView.html'
    }).when('/author', {
        controller: 'AuthorListCtrl'
        , templateUrl: 'views/authorList.html'
    }).when('/author/:authorId', {
        controller: 'AuthorViewCtrl'
        , templateUrl: 'views/authorView.html'
    }).when('/series', {
        controller: 'SeriesListCtrl'
        , templateUrl: 'views/seriesList.html'
    }).when('/series/:seriesId', {
        controller: 'SeriesViewCtrl'
        , templateUrl: 'views/seriesView.html'
    }).otherwise({
        redirectTo: '/'
    });

    /*
     */
    $httpProvider.interceptors.push('dbListInterceptor');
}]);

/**
 * Book Controllers
 * 
 */

bookApp.controller('BookListCtrl', ['$scope', '$route', 'Book', "sharedData", function ($scope, $route, Book, sharedData) {
    var result = Book.query({
        name: $route.current.params.name
    });

    result.$promise.then(function (data) {
        $scope.books = data;
        $scope.dbName = sharedData.dbName.name;
    });
}]);

bookApp.controller('BookViewCtrl', ['$scope', '$route', 'Book', "sharedData", function ($scope, $route, Book, sharedData) {
    var result = Book.get({
        id: $route.current.params.bookId
    });
    result.$promise.then(function (data) {
        $scope.book = data;
        $scope.dbName = sharedData.dbName.name;
    });
}]);

/**
 * Author Controllers
 * 
 */

bookApp.controller('AuthorListCtrl', ['$scope', 'Author', "sharedData", function ($scope, Author, sharedData) {
    var result = Author.query();
    result.$promise.then(function (data) {
        $scope.authors = data;
        $scope.dbName = sharedData.dbName.name;
    });
}]);

bookApp.controller('AuthorViewCtrl', ['$scope', '$route', 'Author', "sharedData", function ($scope, $route, Author, sharedData) {
    var result = Author.get({
        id: $route.current.params.authorId
    });
    result.$promise.then(function (author) {
        $scope.author = author;
        $scope.books = author.books;
        $scope.dbName = sharedData.dbName.name;
    });
}]);
/**
 * Series Controllers
 * 
 */

bookApp.controller('SeriesListCtrl', ['$scope', 'Series', "sharedData", function ($scope, Series, sharedData) {
    var result = Series.query();
    result.$promise.then(function (seriess) {
        $scope.seriess = seriess;
        $scope.dbName = sharedData.dbName.name;
    });
}]);

bookApp.controller('SeriesViewCtrl', ['$scope', '$route', 'Series', "sharedData", function ($scope, $route, Series, sharedData) {
    var result = Series.get({
        id: $route.current.params.seriesId
    });
    result.$promise.then(function (series) {
        $scope.series = series;
        $scope.books = series.books;
        $scope.dbName = sharedData.dbName.name;
    });

}]);


bookApp.controller('dbListCtrl', ['$scope', '$location', '$route', 'dbListService', "sharedData", function ($scope, $location, $route, dbListService, sharedData) {
    var promise = dbListService.findAll();
    promise.then(function (data) {
        $scope.dbList = data;
        $scope.dbName = $scope.dbList.children;
        sharedData.dbName = $scope.dbName;
        $scope.$watch('dbName', function (newVal, oldVal) {
            if (newVal === oldVal) {

            } else {
                sharedData.dbName = $scope.dbName;
                $route.reload();
            }
        });
    });


}]);

bookApp.controller('SearchCtrl', ['$scope', '$location', function ($scope, $location) {
    var searchObj = $location.search();
    $scope.name = searchObj.name;
    $scope.onFormSubmit = function () {
        var url = $location.url('/?name=' + $scope.name, true);
    };

    $scope.$on('$routeChangeSuccess', function () {
        var searchObj = $location.search();
        if (searchObj === undefined) {} else {
            $scope.name = searchObj.name;
        }
    });
}]);

bookApp.filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
});