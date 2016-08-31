// Characters Controller

// Require the model so we can access the collection
var PC = require('../models/pc');

module.exports = {
    get : (req, res) => {
        // Read
        console.log('req.params.id: ', req.params.id)
        if(req.params.id){
            console.log('here')
            // Find One
            PC.findById(req.params.id , function(err, pc){
                console.log('My PC', pc);
                res.json(pc);
            });
        } else {
            PC.find({})
                .populate('pcs') // Property name of a PC doc we want to populate
                .exec(function(err, pcs){
                    res.json(pcs);
                }); // exec gives us a place to pass in the callback function find used to take.  Like a 'then' method for mongoose
        }
    },

    upsert : (req, res) =>{
        // Create / Update
        if(req.params.id){
            // Update existing document
        }
        else {
            // No id in the url, create a new document
            var newPC = new PC(req.body);
            console.log('Yes this is req.session.passport', req.session.passport)
            newPC.player = req.session.passport.user;
            // Save character to DB
            newPC.save(function(err, pc){
                if(err){
                    return res.json(err);
                }
                res.json(pc);
            });
        }

    },

    remove : (req, res) =>{
        // Delete
    }

}



// Our controller file will, at least, perform CRUD operations
// C - Create - inserting documents into the db
// R - Read   - querying, pulling things out of the db
// U - Update - modifying an existing document
// D - Delete - removes a document