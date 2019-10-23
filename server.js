//require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config.json');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
var request = require('request');
const fs = require("fs");
var  os = require('os');
var  hostname = os.hostname(); 
var path = require('path');  
app.disable('x-powered-by') 
app.use(bodyParser.urlencoded({ extended: true,limit: '100mb' })); 
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());
var cookieSession = require('cookie-session') 
var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'token',
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('token');        
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

//var file  = request('https://cslmis.s3-us-west-2.amazonaws.com/cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json').pipe(fs.createWriteStream('cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json'))
//var cors = require('cors');

/* app.use(function(req, res, next) { 
res.header("Access-Control-Allow-Credentials",true);     
res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");     
res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS"); 
res.header("Access-Control-Allow-Origin", "*"); 
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
next();
    }); */

/* var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(sessionCookie({ 
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
    secure: false,
    httpOnly: true,
    domain: 'localhost',
    path: '/_usdb',
    expires: expiryDate
    }
})) */
     
//var file  = request('https://cslmis.s3-us-west-2.amazonaws.com/cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json').pipe(fs.createWriteStream('cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json'))   //var cors = require('cors');
var router = express.Router();
var path = __dirname + '/public/';

/* router.use(function (req,res,next) {
  console.log( req.body);
  next();
}); */

// use JWT auth to secure the api
//app.use(jwt());


//app.use('/users', require('./users/users.controller'));
app.use("/",router);

app.use('/public/assets/', express.static(__dirname + '/public/assets/'));
app.use('/public/assets/css/', express.static(__dirname + '/public/assets/css/'));
app.use('/public/assets/css/bootstrap/', express.static(__dirname + '/public/assets/css/bootstrap/'));
app.use('/public/assets/css/bootstrap/mixins/', express.static(__dirname + '/public/assets/css/bootstrap/mixins/'));
app.use('/public/assets/css/bootstrap/utilities/', express.static(__dirname + '/public/assets/css/bootstrap/utilities/'));
app.use('/public/assets/css/components/', express.static(__dirname + '/public/assets/css/components/'));
app.use('/public/assets/fonts/fontawesome/css/', express.static(__dirname + '/public/assets/fonts/fontawesome/css/'));
app.use('/public/assets/fonts/ionicons/css/', express.static(__dirname + '/public/assets/fonts/ionicons/css/'));
app.use('/public/assets/fonts/ionicons/fonts/', express.static(__dirname + '/public/assets/fonts/ionicons/fonts/'));
app.use('/public/assets/fonts/law-icons/font/', express.static(__dirname + '/public/assets/fonts/law-icons/font/'));
app.use('/public/assets/fonts/slick/', express.static(__dirname + '/public/assets/fonts/slick/'));
app.use('/public/assets/images/', express.static(__dirname + '/public/assets/images/'));
app.use('/public/assets/js/', express.static(__dirname + '/public/assets/js/'));
app.use('/public/assets/js/custom/', express.static(__dirname + '/public/assets/js/custom/'));
app.use('/public/assets/scss/', express.static(__dirname + '/public/assets/scss/'));
app.use('/public/assets/scss/bootstrap/mixins/', express.static(__dirname + '/public/assets/scss/bootstrap/mixins/'));
app.use('/public/assets/scss/bootstrap/utilities/', express.static(__dirname + '/public/assets/scss/bootstrap/utilities/'));
app.use('/public/assets/scss/components/', express.static(__dirname + '/public/assets/scss/components/'));
app.use('/public/assets/scss/mixins/', express.static(__dirname + '/public/assets/scss/mixins/'));

// protected views
app.use('/public/view/', express.static(__dirname + '/public/view/'));
app.use('/public/view/css/', express.static(__dirname + '/public/view/css/'));
app.use('/public/view/img/', express.static(__dirname + '/public/view/img/'));
app.use('/public/view/js/', express.static(__dirname + '/public/view/js/'));
app.use('/public/view/js/demo/', express.static(__dirname + '/public/view/js/demo/'));
app.use('/public/view/scss/', express.static(__dirname + '/public/view/scss/'));
app.use('/public/view/scss/navs/', express.static(__dirname + '/public/view/scss/navs/'));
app.use('/public/view/scss/utilities/', express.static(__dirname + '/public/view/scss/utilities/'));
app.use('/public/view/vendor/bootstrap/js/', express.static(__dirname + '/public/view/vendor/bootstrap/js/'));
app.use('/public/view/vendor/bootstrap/scss/', express.static(__dirname + '/public/view/vendor/bootstrap/scss/'));
app.use('/public/view/vendor/chart.js/', express.static(__dirname + '/public/view/vendor/chart.js/'));
app.use('/public/view/vendor/datatables/', express.static(__dirname + '/public/view/vendor/datatables/'));
app.use('/public/view/vendor/fontawesome-free/', express.static(__dirname + '/public/view/vendor/fontawesome-free/'));
app.use('/public/view/vendor/fontawesome-free/css/', express.static(__dirname + '/public/view/vendor/fontawesome-free/css/'));
app.use('/public/view/vendor/fontawesome-free/js/', express.static(__dirname + '/public/view/vendor/fontawesome-free/js/'));
app.use('/public/view/vendor/fontawesome-free/less/', express.static(__dirname + '/public/view/vendor/fontawesome-free/less/'));
app.use('/public/view/vendor/fontawesome-free/scss/', express.static(__dirname + '/public/view/vendor/fontawesome-free/scss/'));
app.use('/public/view/vendor/fontawesome-free/sprites/', express.static(__dirname + '/public/view/vendor/fontawesome-free/sprites/'));
app.use('/public/view/vendor/fontawesome-free/svgs/brands/', express.static(__dirname + '/public/view/vendor/fontawesome-free/svgs/brands/'));
app.use('/public/view/vendor/fontawesome-free/svgs/regular/', express.static(__dirname + '/public/view/vendor/fontawesome-free/svgs/regular/'));
app.use('/public/view/vendor/fontawesome-free/svgs/solid/', express.static(__dirname + '/public/view/vendor/fontawesome-free/svgs/solid/'));
app.use('/public/view/vendor/fontawesome-free/webfonts/', express.static(__dirname + '/public/view/vendor/fontawesome-free/webfonts/'));
app.use('/public/view/vendor/jquery/', express.static(__dirname + '/public/view/vendor/jquery/'));
app.use('/public/view/vendor/jquery-easing/', express.static(__dirname + '/public/view/vendor/jquery-easing/'));

 router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});
router.get("/_usdb",function(req,res){ 
    console.log('session',req.session.name) // 'Flavio'
    res.sendFile(path + "view/index.html");
  }); 

app.use('/user', require('./routes/user/User'));
app.use('/auth', require('./routes/auth/authentication'));

// global error handler
app.use(errorHandler);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = server;
