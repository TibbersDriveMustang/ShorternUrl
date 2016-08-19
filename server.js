/**
 * Created by Tibbers on 8/18/16.
 */
var express = require('express');
var app = express();
var restRouter =  require('./routes/rest');
var redirectRouter =  require('./routes/redirect');

app.longToShortHash = {};

app.shortToLongHash = {};

app.use('/api/v1', restRouter);

app.use('/:shortUrl', redirectRouter);

app.listen(3000);