/**
 * Created by Tibbers on 8/13/16.
 */
var express = require('express');
var router = express.Router();          //Using express router

router.get('/', function (req, res) {
    res.sendfile('./public/views/index.html');   //start from root
});

module.exports = router;