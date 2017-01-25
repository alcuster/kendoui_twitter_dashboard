const express = require('express');
var twit = require('twitter');
const router = express.Router();
var path = require('path');

var twitter = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/tweets', function(req, res, next) {
  twitter.get('search/tweets', { q: "Davidson College"}, function(error, tweets, response){
    if (error) throw error;
    res.send(tweets.statuses);
  });
});

module.exports = router;
