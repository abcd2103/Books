/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("dbListController");
var conf = require("../conf");

module.exports = function (dbListRouter) {
    var dbListController = {};

    dbListController.findAll = function (req, resp, next) {
        resp.send(JSON.stringify(conf.databases));
    };
    dbListRouter.get("/", dbListController.findAll);

    return dbListController;
};