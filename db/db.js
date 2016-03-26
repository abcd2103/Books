/*jslint node:true */
"use strict";


var sqlite3 = require("sqlite3").verbose();
var config = require("../conf.json");

module.exports = {
    openDB: function (dbName, callback) {
        var dbpath = config.dbPaths[dbName];
        console.log(dbpath);
        var db = new sqlite3.cached.Database(dbpath, callback);
        return db;
    }
};