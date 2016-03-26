/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("seriesService");

module.exports = function (seriesDao) {
    var seriesService = {};
    seriesService.findByName = function (dbName,name, offset, limit, callback) {
        logger.debug("Before run Name:= " + name);
        seriesDao.findByName(dbName,name,offset,limit,callback);
    };

    seriesService.findById = function (dbName,id, callback) {
        seriesDao.findById(dbName,id,callback);
    };
    return seriesService;
};
