// Users Controller

// Require the model so we can access the collection
var User = require('../models/user');

module.exports = {
    get : (req, res) => {
        console.log('req.session: ', req.session)
        // res.end();
        // Read
        User.findOne({ _id : req.session.passport.user}, function(err, user){
            res.json(user);
        }); // exec gives us a place to pass in the callback function find used to take.  Like a 'then' method for mongoose
    },

    findUserID : (req, res) => {
        var results = User.findUser( req.params.id );
        res.json( results.length > 0 ? results : 'User not found !| BEEP BOOP' );
    },

    upsert : (req, res) =>{
        // Create / Update
        if(req.params.id){
            // Update existing document
        }
        else {
            // No id in the url, create a new document
            var newUser = new User(req.body);

            // Save character to DB
            newUser.save(function(err, user){
                if(err){
                    return res.json(err);
                }
                res.json(user);
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


    // genre : function(req, res){
    //     // How do we get books of one genre using paramaterized URLs?
        
    //     // github.com/refactoru
    //     // github.com/devaio
    //     // github.com/*
    //     // console.log('the REAL params', req.params)
    //     var results = Library.findGenre( req.params.genre );
    //     res.json( results.length > 0 ? results : 'No Books :(' );
    // },