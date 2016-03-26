/*jslint node:true */

var fs = require('fs')
    , path = require('path')
    , lodash = require('lodash')
    , Sequelize = require('sequelize')
    , config = require("../conf");

// Add functionality for multiple databases

var databases = {};

var importFiles = function (database) {
    var models = database.models;
    var sequelize = database.sequelize;
    fs.readdirSync(__dirname)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'index2.js');
        })
        .forEach(function (file) {
            var model = sequelize.import(path.join(__dirname, file));
            if (model instanceof Array) {
                model.forEach(function (m) {
                    models[m.name] = m;
                });
            } else {
                models[model.name] = model;
            }
        });

    Object.keys(models).forEach(function (modelName) {
        if ('associate' in models[modelName]) {
            models[modelName].associate(models);
        }
    });
    
//    lodash.extend(database,models);
};


for (var key in config.databases) {
    var dbName = config.databases[key].name;
    var dbPath = config.databases[key].path;    
    var sequelize = new Sequelize(dbName, null, null, {
        dialect: 'sqlite'
        , storage: dbPath
    });
    var database = {
        "name": dbName
        , "path": dbPath
        , "sequelize": sequelize
//        , "Sequelize": Sequelize
        , "models":{}
    };
    importFiles(database);
    databases[dbName] = database;
}
//console.log(databases);


//
//var exportVar =
//    lodash.extend({
//        sequelize: sequelize
//        , Sequelize: Sequelize
//    }, db);

//console.log(databases);
module.exports = databases;