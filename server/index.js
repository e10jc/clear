require('dotenv').config()

const express = require('express')
const session = require('express-session')
const next = require('next')

const addFacebookOauth = require('./middlewares/oauth/facebook')
const addTwitterOauth = require('./middlewares/oauth/twitter')

const nextApp = next({dev: process.env.NODE_ENV !== 'production'})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  }))

  addFacebookOauth(app)
  addTwitterOauth(app)

  app.get('*', handle)
  
  app.listen(3000)
})