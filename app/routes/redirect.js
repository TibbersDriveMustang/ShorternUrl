/**
 * Created by Tibbers on 8/13/16.
 *
 * Used to redirect to corresponding shortUrl page
 */
var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');
var statsService = require('../services/statsService');

router.get('*', function (req, res) {
    //ignore the first letter "/", e.g "/shortUrl/123"
    var shortUrl = req.originalUrl.slice(1);
    urlService.getLongUrl(shortUrl,function (url) {
        if(url){
            //ask browser to redirect to the given longUrl website, pay attention to "too many redirect", when url is "Undefine",that the shortUrl not exists
            res.redirect(url.longUrl);
            //count visit time
            statsService.logRequest(shortUrl, req);
        }else{
            res.sendfile('./public/views/404.html');  //start from root
        }
    });
});

module.exports = router;