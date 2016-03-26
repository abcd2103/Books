/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("seriesController");

module.exports = function (seriesRouter, seriesService) {
    var seriesController = {};

    seriesController.findByName = function (req, resp, next) {
        var name = req.query.name;
        var offset = req.query.offset;
        var limit = req.query.limit;
        var dbName = req.query.dbName;
        logger.debug("Before run Name:= " + name);
        seriesService.findByName(dbName, name, offset, limit, function (series) {
            resp.send(JSON.stringify(series));
        });
    };

    seriesController.findById = function (req, resp) {
        var id = req.params.id;
        var dbName = req.query.dbName;
        seriesService.findById(dbName, id, function (series) {
            resp.send(JSON.stringify(series));
        });
    };
    seriesRouter.get("/", seriesController.findByName);
    seriesRouter.get("/:id", seriesController.findById);

    return seriesController;
};