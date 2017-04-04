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

const deleteDuplicates = () => {
  database.any(`DELETE FROM tweets WHERE ctid NOT IN
(SELECT max(ctid) FROM tweets GROUP BY tweets.*)`)
}

const dropDb = () => db.none('DROP DATABASE IF EXISTS pajarito3026')

module.exports = {
  getAllTweets,
  addTweet,
  deleteDuplicates,
  dropDb
}
