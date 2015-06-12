var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title: {type: String, required: true},
	author: String,
	ISBN: Number,
	avergeRating: Number,
	price: Number
});

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;