/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("authorDao");

module.exports = function (databases) {

    var authorDao = {};
    authorDao.findByName = function ( dbName, name, offset, limit, callback) {
        var models = databases[dbName || global.defaultDB].models;
        var self = this;
        logger.debug("Before run Name:= " + name);
        name = name === undefined || null ? "" : name;

        models.author.findAll({
            where: {
                $or: {
                    name: {
                        $like: '%' + name + '%'
                    }
                }
            }
            , "limit": limit === undefined || null ? 0 : limit
            , "offset": offset === undefined || null ? 0 : offset
        }).then(function (authors) {
            callback(authors);
        }).catch(function (reason) {
            console.log(reason);
        });
    };

    authorDao.findById = function (dbName, id, callback) {
        var models = databases[dbName|| global.defaultDB].models;
        var self = this;
        logger.debug("Before run Id:= " + id);

        models.author.findById(id, {
            include: [{
                    model: models.book
                    , as: 'books'
                    , include: [
                        {
                            model: models.series
                            , as: 'series'
                            , where: {}
                            , required: false
                    }




                        
                        , {
                            model: models.author
                            , as: 'authors'
                            , where: {}
                            , required: false
                    }




                        
                        , {
                            model: models.bookFormat
                            , as: 'formats'
                            , where: {}
                            , required: false
                    }

                ]
       }
                ]
        }).then(function (author) {
            callback(author);
        }).catch(function (reason) {
            console.log(reason);
        });
    };

    return authorDao;
};