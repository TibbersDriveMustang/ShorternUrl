/**
 * Created by Tibbers on 8/13/16.
 */
var express = require('express');
var app = express();
var apiRouter = require('./routes/api');
var redirectRouter = require('./routes/redirect');

app.user('/api/v1', apiRouter);

app.user('/:shortUrl',redirectRouter);

app.listen(3000);
