import * as fetch from 'isomorphic-fetch'
import {OAuth2} from 'oauth'
import {URLSearchParams} from 'url'

const STATE = '429i2m3d'

export default app => {
  const consumer = new OAuth2(
    process.env.REDDIT_APP_ID,
    process.env.REDDIT_APP_SECRET,
    'https://www.reddit.com/api/v1',
    '/authorize',
    '/access_token',
  )

  app.get('/oauth/reddit/connect', async (req, res) => {
    res.redirect(consumer.getAuthorizeUrl({
      duration: 'permanent',
      response_type: 'code',
      scope: 'history',
      state: STATE,
      redirect_uri: process.env.REDDIT_REDIRECT_URL,
    }))
  })
  
  app.get('/oauth/reddit/callback', async (req, res) => {
    const body = new URLSearchParams()
    body.append('grant_type', 'authorization_code')
    body.append('code', req.query.code)
    body.append('redirect_uri', process.env.REDDIT_REDIRECT_URL)

    const password = `${process.env.REDDIT_APP_ID}:${process.env.REDDIT_APP_SECRET}`
    const Authorization = `Basic ${Buffer.from(password).toString('base64')}`

    try {
      const data = await fetch('https://www.reddit.com/api/v1/acccess_token', {
        body,
        headers: {
          // Authorization,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      })

      console.log(data)

      res.send(await data.json())
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  })
}