var mongoose = require('mongoose');

// Create a model / schema
var userSchema = mongoose.Schema({
    googleid: 		{type : String},
    name:       	{type : String},
    created: {
        type: Number,
        default: () => Date.now()
    }
});



// var userExport = mongoose.model('user', userSchema);

module.exports = mongoose.model('user', userSchema);

// export the model
// module.exports = {
// user : mongoose.model('user', userSchema),
// findUser : findUser,
// }// Our entrypoint into the characters collection in the DB
// // users