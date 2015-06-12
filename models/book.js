var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title: {type: String, required: true},
	authors: String,
	publishedDate: Number,
	avergeRating: Number,
	indentifier: Number
});

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;