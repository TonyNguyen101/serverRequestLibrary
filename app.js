var express = require('express');
app = express();

var bodyParser = require("body-parser");
var methodOverrider = require('method-override');



app.listen(3000, function(){
	console.log("You are now listening to Zombo.com 3000")
});
