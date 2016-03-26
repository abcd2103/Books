/*jslint node:true */

var fs = require('fs')
    , path = require('path')
    , lodash = require('lodash')
    , Sequelize = require('sequelize')
    , sequelize = null
    , db = {};

sequelize = new Sequelize('children', null, null, {
    dialect: 'sqlite'
    , storage: 'D:/nodejsTutorials/data/metadata_children.db'
});


fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'index2.js');
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        if (model instanceof Array) {
            model.forEach(function (m) {
                db[m.name] = m;
            });
        } else {
            db[model.name] = model;
        }
    });

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});


var exportVar =
    lodash.extend({
        sequelize: sequelize
        , Sequelize: Sequelize
    }, db);

console.log(exportVar);
module.exports = exportVar;