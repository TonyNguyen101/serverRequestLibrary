var mongoose = require('mongoose');

var archerSchema = new mongoose.Schema({
	name: String,
	codeName: {type: String, required: 1},
	Picture: String,
	aliveYN: Boolean,
	mixedBag: [String]  
});

var Archer = mongoose.model("Archer", archerSchema);

module.exports = Archer;