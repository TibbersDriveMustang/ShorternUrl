/**
 * Created by Tibbers on 8/13/16.
 */
var express = require('express');
var router = express.Router();
var uslService = require('./urlService');

router.get('*', function (req, res) {
    var shortUrl = req.originalUrl.slice(1);
    var longUrl = uslService.getLongUrl(shortUrl,req.app.shortToLongHash);
    res.redirect(longUrl);
});

module.exports = router;