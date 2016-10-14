/**
 * Created by Tibbers on 9/21/16.
 * Used to store Url addition info into MongoDb
 */
var mongoos = require('mongoose');
var Schema = mongoos.Schema;

var RequestSchema = new Schema({
    shortUrl : String,
    referer: String,
    platform: String,
    browser: String,
    country: String,
    timestamp: Date
});

var requestModel = mongoos.model('RequestModel', RequestSchema);

module.exports = requestModel;