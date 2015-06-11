var express = require('express');
app = express();

var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var morgan  = require('morgan');
var db = require('./models');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

//INDEX
app.get('/', function (req, res){
	res.redirect('/archers');
});
app.get('/archers', function (req, res){
	db.Archer.find({}, function(err, archers){
		res.render('archers/index', {archers:archers});	
	});
});
//NEW
app.get('/archers/new', function (req, res){
	res.render("archers/new");
});
//CREATE
app.post('/archers', function (req, res){
	db.Archer.create(req.body.archers, function (err, archer){
		res.redirect('archers');
	});
});
//SHOW
app.get('/archers/:id/show', function (req, res){
	db.Archer.findById(req.params.id, function (err, archer){
		res.render("archers/show", {archer:archer});	
	});
});
//EDIT
app.get('/archers/:id/edit', function (req, res){
	db.Archer.findById(req.params.id, function (err, archer){
		res.render("archers/edit", {archer:archer});	
	});
});
//UPDATE
app.put('/archers/:id', function (req, res){
	db.Archer.findByIdAndUpdate(req.params.id, req.body.archers, function (err, archer){
		res.redirect('/archers');
	});
});
//DESTROY
app.delete('/archers/:id', function (req, res){
	db.Archer.findByIdAndRemove(req.params.id, function (err, archer){
		res.redirect('/archers');
	});
});
//CATCH-ALL ERROR
app.get('*', function (req, res){
	res.render('archers/404');
});


app.listen(3000, function(){
	console.log("You are now listening to Zombo.com 3000");
});
