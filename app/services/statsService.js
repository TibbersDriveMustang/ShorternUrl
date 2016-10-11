/**
 * Created by Tibbers on 9/21/16.
 */
var geoip = require('geoip-lite');
var RequestModel = require('../modules/requestModel');

var logRequest = function (shortUrl, req) {
    var reqInfo = {};
    reqInfo.shortUrl = shortUrl;
    reqInfo.referer = req.headers.referer || 'Unknown';
    reqInfo.platform = req.useragent.platform || 'Unknown';
    reqInfo.browser = req.useragent.browser || 'Unknown';
    var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress    ||
            req.socket.remoteAddress        ||
            req.connection.socket.remoteAddress;
    var geo = geoip.lookup(ip);
    if(geo){
        reqInfo.country = geo.country;
    }
    else{
        reqInfo.country = 'Unknown';
    }
    reqInfo.timestamp = new Date();
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

    RequestModel.aggregate([
        {
            $match: {
                shortUrl: shortUrl
            }
        },
        {
            $sort: {
                timestamp: -1
            }
        },
        {
            $group: {
                _id: groupId,
                count:{
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