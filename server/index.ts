import * as express from 'express'
import * as session from 'express-session'
import {readFileSync} from 'fs'
import {createServer} from 'https'
import * as next from 'next'

import addFacebookOauth from './middlewares/oauth/facebook'
import addInstagramOauth from './middlewares/oauth/instagram'
import addTwitterOauth from './middlewares/oauth/twitter'

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
  addInstagramOauth(app)
  addTwitterOauth(app)

  app.get('*', handle)
  
  if (process.env.USE_LOCAL_SSL) {
    createServer({
      key: readFileSync(__dirname + '/ssl/key.pem'),
      cert: readFileSync(__dirname + '/ssl/cert.pem'),
      passphrase: process.env.SSL_PASSPHRASE,
    }, app).listen(3000)
  } else {
    app.listen(3000)
  }
})