import express from 'express'
import twitterAPI from 'twitter'
import config from '../../config.js'

const router = express.Router()

const twitter = new twitterAPI(config)

const params = {
  screen_name: 'asantos3026',
  q: 'asantos3026',
  count: 10
}

router.get('/', (request, response) => {
  twitter.get('search/tweets', params, (error, tweets, twitterResponse) => {
    response.json(tweets)
    // console.log('my tweets', tweets)
  })
})


export default router