'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

var _database = require('../database/database.js');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var twitter = new _twitter2.default(_config2.default);

var params = {
  q: 'asantos3026',
  lang: 'en',
  result_type: 'recent'
};

router.get('/', function (request, response) {
  twitter.get('search/tweets', params, function (error, tweets, twitterResponse) {
    for (var i = 0; i < tweets.statuses.length; i++) {
      console.log('my tweet', tweets.statuses[i].text);
      _database2.default.addTweet(tweets.statuses[i].text);
    }
    response.json(tweets.statuses[0].text);
  });
});

exports.default = router;