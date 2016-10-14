/**
 * Created by Tibbers on 8/18/16.
 */
var express = require('express');
var app = express();
var restRouter =  require('./routes/rest');
var redirectRouter =  require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var useragent = require('express-useragent');

mongoose.connect('mongodb://admin:admin@ds013956.mlab.com:13956/urlshortener');


//Using Express.js to put get listen with server
//use different router for different Urls

//js resourse refer redirect to its actual path
app.use('/node_modules', express.static(__dirname + "/node_modules"));

//If Url start with '/public', return the relative files under '/public' + /***
app.use('/public', express.static(__dirname + "/public"));

//add useragent info
app.use(useragent.express());

app.use('/api/v1', restRouter);

app.use('/', indexRouter);

app.use('/:shortUrl', redirectRouter);

app.listen(3000);