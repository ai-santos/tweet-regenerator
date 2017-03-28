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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var twitter = new _twitter2.default(_config2.default);

var params = {
  screen_name: 'asantos3026'
};

router.get('/', function (request, response) {
  twitter.get('users/lookup', params, function (error, tweets, twitterResponse) {
    response.json(tweets);
    // console.log('my tweets', tweets)
  });
});

exports.default = router;