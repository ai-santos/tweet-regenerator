import express from 'express'
import twitterAPI from 'twitter'
import config from '../../config.js'
import db from '../database/database.js'

const router = express.Router()

const twitter = new twitterAPI(config)

const params = {
  screen_name: 'asantos3026',
  q: 'asantos3026',
  lang: 'en',
  result_type: 'recent'
}

//store tweets from database in here
const allTweets = []

//get all of the tweets from the database
const getTweets = () => {
  db.getAllTweets()
  .then( (tweets) => {
    for(let i = 0; i < tweets.length; i++) {
      allTweets.push(tweets[i].tweetext)
    }
    db.deleteDuplicates()
  })
}

//get a random tweet
const getOneRandomTweet = () => {
  getTweets()
  const allTweetsLength = allTweets.length
  const index = Math.floor(Math.random() * allTweetsLength + 1);
  return allTweets[index]
}

router.get('/', (request, response) => {
  db.getAllTweets()
  .then( (tweets) => {
    response.render('home', {tweets})
  })
})

router.get('/populateDb', (request, response) => {
  twitter.get('search/tweets', params, (error, tweets, twitterResponse) => {
    for(var i = 0; i < tweets.statuses.length; i++) {
      db.addTweet(tweets.statuses[i].text)
    }
    // response.render('home', {tweets})
  })
})

function reTweet() {
  const allTweets = []
   db.getAllTweets()
  .then( (results) => {
    for(let i = 0; i < results.length; i++) {
      allTweets.push(results[i].tweetext)
    }
    const arrayLength = allTweets.length
    const index = Math.floor((Math.random() * arrayLength) + 1);
    console.log('index: ', index) //console.log here is intentionally left in!
    const latestTweet = {
      status: allTweets[index]
    }

    twitter.post('statuses/update', latestTweet, (error, tweets, twitterResponse) => {
      if(error) {
        console.log('Post failed', error)
      } else {
        console.log('Success')
      }
    })
  })
}
//Retweet the latest tweet
setInterval(reTweet, 10000)


export default router