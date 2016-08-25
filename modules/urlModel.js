/**
 * Created by Tibbers on 8/23/16.
 */
var mongoos = require('mongoose');
var Schema = mongoos.Schema;

var UrlSchema = new Schema({
    longUrl : String,
    shortUrl : String
});

var urlModel = mongoos.model('urlModel', UrlSchema);

module.exports = urlModel;