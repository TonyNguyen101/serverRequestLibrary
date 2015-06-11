var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/archer_app");
mongoose.set("debug", true);

module.exports.Archer = require("./archer");