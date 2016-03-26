/*jslint node:true */
"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("bookDao");

module.exports = function (databases) {

    var booksDao = {};

    booksDao.findByName = function (dbName,name, offset, limit, callback) {
        logger.debug(databases);
        var models = databases[dbName || global.defaultDB].models;
        var self = this;
        logger.debug("Before run Name:= " + name + " offset:= " + offset + " limit:= " + limit);
        name = name === undefined || name === null ? " " : name;
        offset = offset === undefined || offset === null ? 0 : offset;
        limit = limit === undefined || limit === null ? 100 : limit;

        logger.debug("Before run Name:= " + name + " offset:= " + offset + " limit:= " + limit);

        models.book.findAll({
            where: {
                $or: {
                    title: {
                        $like: '%' + name + '%'
                    }
                    , authorSort: {
                        $like: '%' + name + '%'
                    }
                }
            }
            , "limit": limit
            , "offset": offset
			, "order" : [['title', 'ASC']]
            , include: [{
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
        }).then(function (books) {
            callback(books);
        }).catch(function (reason) {
            console.log("error", reason);
        });
    };

    booksDao.findById = function (dbName, id, callback) {
        // Get the Database based on Globalsetup
        var models = databases[dbName || global.defaultDB].models;
        var self = this;
        logger.debug("Before run Id:= " + id);

        models.book.findById(id, {
            include: [{
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
        }).then(function (book) {
            callback(book);
        }).catch(function (reason) {
            console.log(reason);
        });
    };

    return booksDao;
};