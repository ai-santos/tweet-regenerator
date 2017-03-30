'use strict';

var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var databaseName = 'pajarito3026';
var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || 'postgres://@localhost:5432/' + databaseName;
var db = pgp(connectionString);

var getAllTweets = function getAllTweets() {
  return db.any('SELECT * FROM tweets');
};

var addTweet = function addTweet(tweet) {
  db.oneOrNone('INSERT INTO tweets (tweetext)\n    VALUES ($1)', [tweet]);
};

var deleteDuplicates = function deleteDuplicates(tweetId) {
  return db.none('DELETE FROM tweets WHERE tweetid=$1', [tweetId]);
};

module.exports = {
  getAllTweets: getAllTweets,
  addTweet: addTweet,
  deleteDuplicates: deleteDuplicates
};