/*jslint node:true */


/*  Sets up all controllers and returns Router 
 * 
 */
var express = require("express");
module.exports = function (app, config) {
    var diContainer = require("../lib/diContainer")();

    diContainer.register('config', require("../conf"));

    diContainer.register('databases', require("../models"));

    diContainer.factory('bookDao', require("../dao/bookDao"));
    diContainer.factory('bookService', require("../services/bookService"));
    diContainer.factory('bookController', require("../controllers/bookController"));
    diContainer.register("bookRouter", express.Router());

    
    diContainer.factory('authorDao', require("../dao/authorDao"));
    diContainer.factory('authorService', require("../services/authorService"));
    diContainer.factory('authorController', require("../controllers/authorController"));
    diContainer.register("authorRouter", express.Router());

    diContainer.factory('seriesDao', require("../dao/seriesDao"));
    diContainer.factory('seriesService', require("../services/seriesService"));
    diContainer.factory('seriesController', require("../controllers/seriesController"));
    diContainer.register("seriesRouter", express.Router());

    diContainer.factory('dbListController', require("../controllers/dbListController"));
    diContainer.register("dbListRouter", express.Router());


    diContainer.get("authorController");
    diContainer.get("bookController");
    diContainer.get("seriesController");
    diContainer.get("dbListController");

    app.use("/book", diContainer.get("bookRouter"));
    app.use("/author", diContainer.get("authorRouter"));
    app.use("/series", diContainer.get("seriesRouter"));
    app.use("/dbList", diContainer.get("dbListRouter"));

};