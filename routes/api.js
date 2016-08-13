/**
 * Created by Tibbers on 8/13/16.
 */
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.post('/urls', jsonParser, function (req, res) {
    var longUrl = req.body.longUrl;
    //implement this
});

module.exports = router;