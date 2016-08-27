/**
 * Created by Tibbers on 8/13/16.
 */
var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');

router.get('*', function (req, res) {
    var shortUrl = req.originalUrl.slice(1);
    urlService.getLongUrl(shortUrl,function (url) {
        if(url){
            res.redirect(url.longUrl);
        }else{
            res.sendfile('./public/views/404.html');  //start from root
        }
    });
});

module.exports = router;