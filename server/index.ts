import * as express from 'express'
import * as addSession from 'express-session'
import {readFileSync} from 'fs'
import * as next from 'next'
import {createServer} from 'spdy'

import addFacebookOauth from './middlewares/oauth/facebook'
import addInstagramOauth from './middlewares/oauth/instagram'
import addRedditOauth from './middlewares/oauth/reddit'
import addTwitterOauth from './middlewares/oauth/twitter'
import addWebsockets from './websockets'

const nextApp = next({dev: process.env.NODE_ENV !== 'production'})
const handle = nextApp.getRequestHandler()
const app = express()

const server = createServer({
  key: readFileSync(__dirname + '/ssl/key.pem'),
  cert: readFileSync(__dirname + '/ssl/cert.pem'),
  passphrase: process.env.SSL_PASSPHRASE,
}, app).listen(3000)

const session = addSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
})

addWebsockets(server, {session})

nextApp.prepare().then(() => {
  app.use(session)

  addFacebookOauth(app)
  addInstagramOauth(app)
  addRedditOauth(app)
  addTwitterOauth(app)

  app.get('*', handle)
  
  server.listen(3000)
})