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

app.use('/node_modules', express.static(__dirname + "/app/node_modules"));

app.use('/public', express.static(__dirname + "/public"));

app.use(useragent.express());

app.use('/api/v1', restRouter);

app.use('/', indexRouter);

app.use('/:shortUrl', redirectRouter);

app.listen(3000);