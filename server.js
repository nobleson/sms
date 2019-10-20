//require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config.json');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
var request = require('request');
const fs = require("fs");
var  os = require('os');
var  hostname = os.hostname(); 
var path = require('path'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//var file  = request('https://cslmis.s3-us-west-2.amazonaws.com/cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json').pipe(fs.createWriteStream('cslmis-admin-firebase-adminsdk-aj55d-e419e36c52.json'))   //var cors = require('cors');
var router = express.Router();
var path = __dirname + '/public/';

/* router.use(function (req,res,next) {
  console.log( req.body);
  next();
}); */

// use JWT auth to secure the api
//app.use(jwt());

// api routes
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




 router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});
 

  app.use('/user', require('./routes/user/User'));


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
