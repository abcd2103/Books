/*jslint node:true */
"use strict";
var argsList = require("args-list");
var conf = require("../conf");
var log4js = require("log4js");
var logger = log4js.getLogger("dicontainer");

module.exports = function () {
    var dependencies = {};
    var factories = {};
    var diContainer = {};

    diContainer.factory = function (name, factory) {
        logger.debug("Registring factory: " + name);
        factories[name] = factory;
    };

    diContainer.register = function (name, instance) {
        logger.debug("Registring Instance: " + name);
        dependencies[name] = instance;
    };

    diContainer.get = function (name) {
        logger.debug("Locating instance for : " + name);

        if (!dependencies[name]) {
            logger.debug("Didn't find instance for : " + name + " Trying with a Factory");
            var factory = factories[name];
            dependencies[name] = factory && diContainer.inject(factory);
            if (!dependencies[name]) {
                logger.debug("Didn't find any whare throw exception : " + name);
                throw new Error('Cannot find module: ' + name);
            }
        }
        return dependencies[name];
    };

    diContainer.inject = function (factory) {
        var args = argsList(factory).map(function (dependency) {
            return diContainer.get(dependency);
        });
        return factory.apply(null, args);
    };
    return diContainer;
};