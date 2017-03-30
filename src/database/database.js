const promise = require('bluebird')
const options = {
  promiseLib: promise
}

const databaseName ='pajarito3026'
const pgp = require('pg-promise')(options)
const connectionString = process.env.DATABASE_URL || `postgres://@localhost:5432/${databaseName}`
const db = pgp(connectionString)

const getAllTweets = () => db.any('SELECT * FROM tweets');

const addTweet = (tweet) => {
  db.oneOrNone(
    `INSERT INTO tweets (tweetext)
    VALUES ($1)`, [tweet]
  )
}

const deleteDuplicates = (tweetId) => {return db.none('DELETE FROM tweets WHERE tweetid=$1', [tweetId] )}

module.exports = {
  getAllTweets,
  addTweet,
  deleteDuplicates
}
