require('dotenv').config()

const express = require('express')
const session = require('express-session')
const next = require('next')
const OAuth = require('oauth')

const twitterOauthConsumer = new OAuth.OAuth(
  'https://twitter.com/oauth/request_token', 
  'https://twitter.com/oauth/access_token', 
  process.env.TWITTER_API_KEY,
  process.env.TWITTER_API_SECRET,
  '1.0A',
  process.env.TWITTER_CALLBACK_URL,
  'HMAC-SHA1'
)

const nextApp = next({dev: process.env.NODE_ENV !== 'production'})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  }))

  app.get('/oauth/twitter/connect', async (req, res) => {
    twitterOauthConsumer.getOAuthRequestToken((error, token, secret) => {
      if (error) return res.send('Error')
      req.session.twitterToken = token
      req.session.twitterSecret = secret
      return res.redirect(`https://twitter.com/oauth/authorize?oauth_token=${token}`)
    })
  })
  
  app.get('/oauth/twitter/callback', (req, res) => {
    twitterOauthConsumer.getOAuthAccessToken(
      req.session.twitterToken, 
      req.session.twitterSecret,
      req.query.oauth_verifier,
      (error, token, secret) => {
        if (error) return res.send('Error')
        req.session.twitterToken = token
        req.session.twitterSecret = secret
        twitterOauthConsumer.get(
          'https://api.twitter.com/1.1/account/verify_credentials.json', 
          req.session.twitterToken, 
          req.session.twitterSecret,
        (error, data) => {
          if (error) return res.send('Error')
          req.session.twitterUser = JSON.parse(data)
          return res.redirect('/')
        })
      }
    )
  })

  app.get('*', handle)
  
  app.listen(3000)
})