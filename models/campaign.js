// Campaign model

var mongoose = require('mongoose');

var campaignSchema = mongoose.Schema({
    name:      {type: String},
    system : {type: String},
    setting:    {type: String},
    ongoing:    {type: Boolean, default: true},
    schedule: {type: String},
    DM: 		{
    		type: mongoose.Schema.ObjectId,
    		ref : 'user'
    },
    players: 		{
    		type: mongoose.Schema.ObjectId,
    		ref : 'user'
    }
});

module.exports = mongoose.model('campaign', campaignSchema);