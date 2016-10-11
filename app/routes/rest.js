/**
 * Created by Tibbers on 8/13/16.
 */

//RESTful API

var express = require('express');
var router = express.Router();    //Using express router

var bodyParser = require('body-parser');   //npm installed 
var jsonParser = bodyParser.json();
var urlService = require('../services/urlService');
var statsService = require('../services/statsService');

router.post('/urls', jsonParser, function (req, res) {
    var longUrl = req.body.longUrl;
    //asynchronous get url
    urlService.getShortUrl(longUrl,function (url) {
        res.json(url);
    });
});

router.get("/urls/:shortUrl", function (req, res) {
    var shortUrl = req.params.shortUrl;
    urlService.getLongUrl(shortUrl,function (url) {
        if(url){
            res.json(url);
        }else{
            res.status(404).send("Not Found");
        }
    });
});

router.get("/urls/:shortUrl/:info", function (req, res) {
    statsService.getUrlInfo(req.params.shortUrl, req.params.info, function (data) {
        res.json(data);
    });
});

module.exports = router;