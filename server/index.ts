import * as express from 'express'
import * as session from 'express-session'
import {readFileSync} from 'fs'
import * as next from 'next'
import * as Io from 'socket.io'
import {createServer} from 'spdy'

import addFacebookOauth from './middlewares/oauth/facebook'
import addInstagramOauth from './middlewares/oauth/instagram'
import addRedditOauth from './middlewares/oauth/reddit'
import addTwitterOauth from './middlewares/oauth/twitter'

const nextApp = next({dev: process.env.NODE_ENV !== 'production'})
const handle = nextApp.getRequestHandler()
const app = express()

const server = createServer({
  key: readFileSync(__dirname + '/ssl/key.pem'),
  cert: readFileSync(__dirname + '/ssl/cert.pem'),
  passphrase: process.env.SSL_PASSPHRASE,
}, app).listen(3000)

const io = Io(server)

io.on('connection', socket => {
  console.log('connection!')
  socket.on('disconnect', () => {
    console.log('disconnected!')
  })
})

nextApp.prepare().then(() => {
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  }))

  addFacebookOauth(app)
  addInstagramOauth(app)
  addRedditOauth(app)
  addTwitterOauth(app)

  app.get('*', handle)
  
  server.listen(3000)
})