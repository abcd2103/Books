/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("bookController");
//var path = require('path');
//var mime = require('mime');

module.exports = function (config, bookRouter, bookService) {
    var bookController = {};

    bookController.findByName = function (req, resp, next) {
        var name = req.query.name;
        var offset = req.query.offset;
        var limit = req.query.limit;
        var dbName = req.query.dbName;
        logger.debug("Before run Name:= " + name);
        bookService.findByName(dbName, name, offset, limit, function (books) {
            resp.send(JSON.stringify(books));
        });
    };

    bookController.findById = function (req, resp) {
        var id = req.params.id;
        var dbName = req.query.dbName;
        logger.debug("Before run Id:= " + id);
        bookService.findById(dbName, id, function (book) {
            resp.send(JSON.stringify(book));
        });
    };

    bookController.getBookByPath = function (req, resp) {
        var file = req.query.file;
        var dbName = req.query.dbName;
        var db = config.databases[dbName];
        logger.debug("file:=" + file);
        if (db === undefined || db === null) {
            resp.send("Not Found");
        } else {
            var folder = db.folder;
            
//            resp.setHeader('Content-disposition', 'attachment; filename=' + filename);

            resp.download(folder + "/" + file);
        }
    };

    bookRouter.get("/getFile", bookController.getBookByPath);
    bookRouter.get("/:id", bookController.findById);
    bookRouter.get("/", bookController.findByName);

    return bookController;
};