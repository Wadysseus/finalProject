var mongoose = require('mongoose');

// Create a model / schema
var pcSchema = mongoose.Schema({
    name:       	{type : String},
    race:       	{type : String},
    characterClass: {type : String},
    level: 			{type: Number},
    campaign:       {
            type : mongoose.Schema.ObjectId,
            ref  : 'campaign' // Collection name as MONGOOSE understands it - first arg to mongoose.model
    },
    inventory: 		{type: Array},
    hitPoints:      {type: Number, default: 0},
    player: 		{
    		type: mongoose.Schema.ObjectId,
    		ref : 'user'
    },
});

// export the model
module.exports = mongoose.model('pc', pcSchema); // Our entrypoint into the characters collection in the DB
// pcs