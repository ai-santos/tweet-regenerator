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

var deleteDuplicates = function deleteDuplicates() {
  database.any('DELETE FROM tweets WHERE ctid NOT IN\n(SELECT max(ctid) FROM tweets GROUP BY tweets.*)');
};

var dropDb = function dropDb() {
  return db.none('DROP DATABASE IF EXISTS pajarito3026');
};

module.exports = {
  getAllTweets: getAllTweets,
  addTweet: addTweet,
  deleteDuplicates: deleteDuplicates,
  dropDb: dropDb
};