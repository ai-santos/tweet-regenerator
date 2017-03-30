import express from 'express'
import twitterAPI from 'twitter'
import config from '../../config.js'
import db from '../database/database.js'

const router = express.Router()

const twitter = new twitterAPI(config)

const params = {
  q: 'asantos3026',
  lang: 'en',
  result_type: 'recent'
}

router.get('/', (request, response) => {
  twitter.get('search/tweets', params, (error, tweets, twitterResponse) => {
    for(var i = 0; i < tweets.statuses.length; i++) {
      console.log('my tweet', tweets.statuses[i].text)
      db.addTweet(tweets.statuses[i].text)
    }
    response.json(tweets.statuses[0].text)
  })
})



export default router