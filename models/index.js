var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/book_app");
mongoose.set("debug", true);

module.exports.Book = require("./book");