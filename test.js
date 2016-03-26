/*jslint node:true */
"use strict";
var diContainer = require("./lib/diContainer")();

diContainer.register('models', require("./models"));

diContainer.factory('bookDao',require("./dao/bookDao"));
diContainer.factory('authorDao',require("./dao/authorDao"));
diContainer.factory('bookService',require("./services/bookService"));
diContainer.factory('authorService',require("./services/authorService"));

var bookService = diContainer.get('bookService');
var authorService = diContainer.get('authorService');
//authorDao.findByName("Row", models, null, 100, function (authors) {
//    //    console.log(JSON.stringify(books));
//    //        console.log(books);
//    for (var i = 0; i < authors.length; i++) {
//        console.log(JSON.stringify(authors[i]));
//        //        console.log("Title:= " + authors[i].name );
//    }
//});



bookService.findByName("e",null,null,function (author) {
    console.log(JSON.stringify(author));
});