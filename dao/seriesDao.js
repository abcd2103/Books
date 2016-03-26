/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("seriesDao");

module.exports = function (databases) {

    var seriesDao = {};
    seriesDao.findByName = function (dbName, name, offset, limit, callback) {
        var models = databases[dbName|| global.defaultDB].models;
        var self = this;
        logger.debug("Before run Name:= " + name);
        name = name === undefined || null ? "" : name;

        models.series.findAll({
            where: {
                $or: {
                    name: {
                        $like: '%' + name + '%'
                    }
                }
            }
            , "limit": limit === undefined || null ? 0 : limit
            , "offset": offset === undefined || null ? 0 : offset
        }).then(function (series) {
            callback(series);
        }).catch(function (reason) {
            console.log(reason);
        });
    };

    seriesDao.findById = function (dbName, id, callback) {
        var self = this;
        var models = databases[dbName|| global.defaultDB].models;
        logger.debug("Before run Id:= " + id);

        models.series.findById(id, {
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
        }).then(function (series) {
            callback(series);
        }).catch(function (reason) {
            console.log(reason);
        });
    };

    return seriesDao;
};