/*jslint node:true */
"use strict";

var db = require("./models");


//console.log(db);
db.author.findById(2, {include:[{model: db.book, as: 'books'}]}).then(function (author) {

    if (author === null) {
        console.log("Received Null");
    } else {
        console.log(author);
    }
});