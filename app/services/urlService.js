/**
 * Created by Tibbers on 8/13/16.
 */

//Remind to import from exact path if it is not in system path
var UrlModel = require('../modules/urlModel');
var redis = require('redis');
var host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
var port = process.env.REDIS_PORT_6379_TCP_PORT || '6379';

var redisClient = redis.createClient(port, host);

var encode = [];

var genCharArray = function (charA, charZ) {
    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);

    for(; i <= j; i++){
        arr.push(String.fromCharCode(i));
    }
    return arr;
};

encode = encode.concat(genCharArray('A','Z'));
encode = encode.concat(genCharArray('0','9'));
encode = encode.concat(genCharArray('a','z'));

var getShortUrl = function (longUrl,callback) {
    //Check the Url start with "http://"
    if( longUrl.indexOf('http') === -1){
        longUrl = "http://" + longUrl;
    }

    redisClient.get(longUrl, function (err, shortUrl) {
        //Get data from redis
        if(shortUrl){
            callback({
                longUrl: longUrl,
                shortUrl: shortUrl
            });
        //Get data from MongoDB
        }else{
            UrlModel.findOne({ longUrl : longUrl}, function (err, url) {
                if(url){
                    callback(url);
                } else{
                    generateShortUrl(function (shortUrl) {
                        //write to MongoDB
                        var url = new UrlModel({ shortUrl : shortUrl, longUrl : longUrl});
                        url.save();
                        //write to redis
                        redisClient.set(shortUrl, longUrl);
                        redisClient.set(longUrl, shortUrl);
                        callback(url);
                    });
                }
            });
        }
    });


};

var generateShortUrl = function (callback) {
    //Find all data from MongoDB
    UrlModel.find({}, function (err, urls) {
        callback(convertTo62(urls.length));
    });
};

var convertTo62 = function (num) {
    var result = '';
    do{
        result = encode[num % 62] + result;
        num = Math.floor(num / 62);
    }while(num);
    return result;
};

var getLongUrl = function (shortUrl, callback) {
    redisClient.get(shortUrl, function (err, longUrl) {
        //If longUrl in redis
        if(longUrl){
            console.log("Redis hit");
            callback({
                longUrl: longUrl,
                shortUrl: shortUrl
            });
        //Find from MongoDB
        }else{
            UrlModel.findOne({shortUrl: shortUrl},function (err, url) {
                callback(url);
            });
        }
    });

};
module.exports = {
    getShortUrl : getShortUrl,
    getLongUrl  : getLongUrl
};