var express = require('express');
app = express();

var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var morgan  = require('morgan');
var request = require('request');
var db = require('./models');
var books;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

//INDEX
app.get('/', function (req, res){
	res.render('books/search');
});
app.get('/search', function (req, res){
	var searchTerm = req.body.searchTerm;
	request.get('https://www.googleapis.com/books/v1/volumes?q=' + searchTerm + '+inTitle&key=AIzaSyBaR9JInYb8nlng5rBJ6T2TicvHEXNqHKc', function(err, res, body){
		if (err) {
	    console.log("Error! Request failed - " + err);
	  } else if (!err && res.statusCode === 200) {
	  	var googleBookData = JSON.parse(body); 
	    /*console.log(googleBookData.items[1].volumeInfo);*/
			books = googleBookData.items;
	  }		
	});
	res.render('books/searchResults', {books: books});
});

app.get('/searchResults', function (req, res){
	console.log(books);
	res.render('books/searchResults', {books: books});
});

app.get('/books', function (req, res){
	db.Book.find({}, function(err, books){
		res.render('books/index', {books:books});	
	});
});
//NEW
app.get('/books/new', function (req, res){
	res.render("books/new");
});
//CREATE
app.post('/books', function (req, res){
	db.Book.create(req.body.books, function (err, book){
		res.redirect('/books');
	});
});
//SHOW
app.get('/books/:id/show', function (req, res){
	db.Book.findById(req.params.id, function (err, book){
		res.render("books/show", {book:book});	
	});
});
//EDIT
app.get('/books/:id/edit', function (req, res){
	db.Book.findById(req.params.id, function (err, book){
		res.render("books/edit", {book:book});	
	});
});
//UPDATE
app.put('/books/:id', function (req, res){
	db.Book.findByIdAndUpdate(req.params.id, req.body.books, function (err, book){
		res.redirect('/books');
	});
});
//DESTROY
app.delete('/books/:id', function (req, res){
	db.Book.findByIdAndRemove(req.params.id, function (err, book){
		res.redirect('/books');
	});
});
//CATCH-ALL ERROR
app.get('*', function (req, res){
	res.render('books/404');
});


app.listen(3000, function(){
	console.log("You are now listening to Zombo.com 3000");
});
