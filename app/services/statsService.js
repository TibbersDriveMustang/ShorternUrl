/**
 * Created by Tibbers on 9/21/16.
 */


var geoip = require('geoip-lite');
var RequestModel = require('../modules/requestModel');

var logRequest = function (shortUrl, req) {
    var reqInfo = {};
    reqInfo.shortUrl = shortUrl;
    //source web
    reqInfo.referer = req.headers.referer || 'Unknown';
    //express-useragent
    reqInfo.platform = req.useragent.platform || 'Unknown';
    reqInfo.browser = req.useragent.browser || 'Unknown';

    var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress    ||
            req.socket.remoteAddress        ;//||
            //req.connection.socket.remoteAddress;
    //Check the area of IP
    var geo = geoip.lookup(ip);
    if(geo){
        reqInfo.country = geo.country;
    }
    else{
        reqInfo.country = 'Unknown';
    }
    //store the time
    reqInfo.timestamp = new Date();

    //Save to MongoDB in sheet name "RequestModel"
    var request = new RequestModel(reqInfo);
    request.save();
};

var getUrlInfo = function (shortUrl, info, callback) {
    if(info === 'totalClicks'){
        RequestModel.count({shortUrl: shortUrl}, function (err, data) {
            callback(data);
        });
        return;
    }

    var groupId = "";
    groupId = "$" + info;

    //Search in MongoDB
    RequestModel.aggregate([
        {
            //find all match the shortUrl
            $match: {
                shortUrl: shortUrl
            }
        },
        {
            //how to sort the match
            $sort: {
                timestamp: -1
            }
        },
        {
            //group all matches based on groupId
            $group: {
                _id: groupId,
                count: {
                    $sum: 1
                }
            }
        }
    ], function (err, data) {
        callback(data);
    });
};

module.exports = {
    logRequest: logRequest,
    getUrlInfo: getUrlInfo
};