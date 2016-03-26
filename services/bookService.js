/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("bookService");

module.exports = function (bookDao) {
    var bookService = {};
    bookService.findByName = function (dbName, name, offset, limit, callback) {
        logger.debug("Before run Name:= " + name);
        bookDao.findByName(dbName, name, offset, limit, callback);
    };

    bookService.findById = function (dbName, id, callback) {
        logger.debug("Before run Id:= " + id);
        bookDao.findById(dbName, id, callback);
    };

    return bookService;
};