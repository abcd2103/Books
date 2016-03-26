/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("authorService");

module.exports = function (authorDao) {
    var authorService = {};
    authorService.findByName = function (dbName, name, offset, limit, callback) {
        logger.debug("Before run Name:= " + name);
        authorDao.findByName(dbName, name,offset,limit,callback);
    };

    authorService.findById = function (dbName,id, callback) {
        authorDao.findById(dbName, id,callback);
    };
    return authorService;
};
