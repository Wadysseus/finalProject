// Campaign controller
// Route handlers dealing with campaigns

var Campaign = require('../models/campaign');

module.exports = {
    get : (req, res) => {
        // Read
        console.log('req.params.id: ', req.params.id)
        if(req.params.id){
            console.log('there')
            // Find One
            Campaign.findById(req.params.id , function(err, campaign){
                console.log('My campaign', campaign);
                res.json(campaign);
            });
        } else {
            Campaign.find({})
                .populate('campaigns') // Property name of a PC doc we want to populate
                .exec(function(err, campaigns){
                    res.json(campaigns);
                }); // exec gives us a place to pass in the callback function find used to take.  Like a 'then' method for mongoose
        }
    },
    upsert : (req, res) =>{
        if(req.params.id){
            // Update
        }
        else{
            // Create
            var newCampaign = new Campaign(req.body);
            newCampaign.save(function(err, doc){
                // res.json({success : 'Campaign successfully added!'});
                res.json(doc);
            });
        }
    }
}


    // get : (req, res) => {
    //     if(req.params.id){
    //         // Find One
    //         Campaign.findOne({ _id : req.params.id }, function(err, campaign){
    //             res.json(campaign);
    //         });
    //     }
    //     else{
    //         // Find Many
    //         Campaign.find({}, function(err, campaigns){
    //             res.json(campaigns);
    //         });
    //     }
    // },