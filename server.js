/*jslint node:true */

/*
 * Module dependencies
 */
var express = require("express")
    , http = require("http")
    , sqlite3 = require("sqlite3")
    , path = require("path")
	, conf = require("./conf");

var log4js = require("log4js");
var logger = log4js.getLogger("server");


// Take port from the environment variable
var port = process.env.PORT || 3000;

// Create Express Application
var app = express();


// Create Express Router
var router = express.Router();
// Dummary Route for testing
router.get('/', function (req, res) {
    res.json({
        message: "Hello World"
    });
});

global.defaultDB = "children";
//Register public Route
app.use(express.static('public'));


// controller folder sets up all routes, controllers, services and daos
var controllers = require("./controllers")(app);

app.listen(port);
console.log("Started App on port" + port);