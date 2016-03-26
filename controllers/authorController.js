/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("authorController");

module.exports = function (authorRouter, authorService) {
    var authorController = {};

    authorController.findByName = function (req, resp, next) {
        var name = req.query.name;
        var offset = req.query.offset;
        var limit = req.query.limit;
        var dbName  = req.query.dbName;
        
        logger.debug("Before run Name:= " + name);
        authorService.findByName(dbName, name, offset, limit, function (authors) {
            resp.send(JSON.stringify(authors));
        });
    };

    authorController.findById = function (req, resp) {
        var id = req.params.id;
        var dbName  = req.query.dbName;
        authorService.findById(dbName, id, function (author) {
            resp.send(JSON.stringify(author));
        });
    };
    authorRouter.get("/", authorController.findByName);
    authorRouter.get("/:id", authorController.findById);

    return authorController;
};