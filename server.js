require('colors'); 

var express = require('express'),
	app = express(),
	logger = require('morgan'),
	mongoose = require('mongoose')
	bodyParser = require('body-parser'),
	port = process.env.PORT || 1337,
	path = require('path'),
	ejs = require('ejs'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    User = require('./models/user.js'),
	Routes = require('./routes/index.js');

app.use(express.static(path.join(__dirname,'/public')));
// app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));


//W connecting to my crAPI DB
mongoose.connect('mongodb://localhost/crAPI', (error) => {
    if(error) {
        console.error('Oh no, could not start mongoose!', error);
        process.exit(1); // exits a node application, anything other than 0 is considered an error
    } else {
        console.log('Mongoose started successfully, human.'.blue);
    }
});

//W declaring login variables
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

//W setting the session properties
app.set('session', session({
    secret : 'purple monkey dishwasher',
    resave : true,
    saveUninitialized : true
}));
app.use( app.get('session') ); //W Ensuring that the app will always use 'session' on get requests?

app.use( passport.initialize() ); // Hooks into app
app.use( passport.session() ); // Hooks into sessions
app.use (flash()); // for debugging error messages with google passport login

// cookies are strings. strings are "SERIAL" data.
passport.serializeUser(function(user, done) {
    done(null, user.id);
}); // What passport is storing on the client (cookie)
passport.deserializeUser(function(id, done) {
    done(null, id);
}); // How passport finds the corresponding user using the cookie

app.set('view engine', 'html'); // private view files
app.engine('html', ejs.renderFile) // res.render

passport.use(new GoogleStrategy({
    clientID: process.env.crAPI_ID,
    clientSecret: process.env.crAPI_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('TOKENS', accessToken, refreshToken);
    console.log('PROFILE', profile);

    // Attempt to see if the user exists already in the DB
    User.findOne({ googleid : profile.id }, function(err, foundUser){
        console.log(1)
        if(!foundUser){
            console.log(2)
            var newOne =  new User({
                googleid : profile.id,
                name     : profile.name.givenName
            })

            newOne.save(function(err, savedUser){
                // User didn't exist before, now that they do, send them to passport
                cb(null, savedUser);
                console.log(3, savedUser)
                console.log('Yes, this is error', err)
            })
        }
        else{
            // User already exists, pass them off to passport
            cb(null, foundUser)
        }

    })

  }
));

Routes(app);

app.listen(port, (err)=>{
	if(err){
		console.error(err)
	} else {
		console.log('Server online, port: '.cyan + port);
	}
});

// Colors module: Emphasis: bold, italic, underline, inverse. Colors: yellow, cyan, white, magenta, green, red, grey, blue.