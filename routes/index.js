var pcCtrl = require('./pcs');
var cCtrl  = require('./campaigns');
var uCtrl  = require('./users');
var flash  = require('connect-flash');

var passport = require('passport');

module.exports = (app) => {
	
    // Passport Routes
// Might work? -=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-===-=-
    app.param('user_id', function(req, res, next, user_id) {
      // typically we might sanity check that user_id is of the right format
      uCtrl.find(user_id, function(err, user) {
        if (err) return next(err);
        if (!user) return next(404);
     
        req.user = user;
        next()
      });
    });
// -=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-===-=--=-

    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })); // Route that takes you to the google sign in page

    app.get('/auth/google/callback', 
    passport.authenticate('google', {   failWithError: true,
                                        failureFlash: true,
                                        failureRedirect: '/loginFail',
                                        
     }),  // 
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/profile/'); //res.redirect('/profile/:id');  <-- Need to figure out how to get this working
        }); // Where google redirects you when the user is done signing in

	app.get('/', (req,res) => {
		res.sendFile("index.html", {root: "./public/html"})
	});

	app.get('/login', (req,res) => {
		res.sendFile("login.html", {root: "./public/html"})
	});

    app.get('/logout', (req,res) => {
        console.log("logged out!");
        req.logout();
        res.redirect('/');
    });

	app.get('/about', (req,res) => {
		res.sendFile("about.html", {root: "./public/html"})
	});

	app.get('/profile', (req,res) => {
		res.sendFile("profileHome.html", {root: "./public/html"})
	});

    // app.get('/profile/:id', uCtrl.userID);

    app.get('/loginFail', function (req, res) {
        console.error('Flash console error', req.flash('info'));
        res.render('login', {messages : req.flash('info') });

    })

    // PC Routes
    app.get('/api/pcs', pcCtrl.get);
    app.get('/api/pcs/:id', pcCtrl.get); // Find One
    app.post('/api/pcs', pcCtrl.upsert);

    // Campaign Routes
    app.get('/api/campaigns', cCtrl.get); // Find Many
    app.get('/api/campaigns/:id', cCtrl.get); // Find One
    app.post('/api/campaigns', cCtrl.upsert); // Create
    app.post('/api/campaigns/:id', cCtrl.upsert); // Update
    
    // User Routes
    app.get('/api/user/', uCtrl.get);
    app.get('/api/user/:user_id', uCtrl.get);


}



// Sample code from Dr. Internet:



// app.get('/users/:user_id/profile_url', function(req, res, next) {
//   res.json('cdn.example.com/' + req.user.profile_url);
// });
 
// app.get('/users/:user_id/activities', function(req, res, next) {
//   res.json(req.user.activities);
// });
 
// app.get('/users/:user_id/friends', function(req, res, next) {
//   res.json(req.user.friends);
// });



    // -=-===-=--=-===-=--=-===-=-DREW CODE TO FIGGER OUT?-=-===-=--=-===-=--=-===-=-

        // app.isAuthenticated = function(req, res, next){
        // // If the current user is logged in...
        // if(req.isAuthenticated()){
        //     return next();
        // }
        // // If not, redirect to login
        // console.log('ur google asplode')
        // res.redirect('/login');
        // }

        // app.get('/profile', app.isAuthenticated, function(req, res){
        // res.sendFile('/profileHome.html', {root: './hidden'})
        // })

    // -=-===-=--=-===-=--=-===-=-END OF DREW CODE-=-===-=--=-===-=--=-===-=-