import {OAuth2} from 'oauth'

export default app => {
  const consumer = new OAuth2(
    process.env.INSTAGRAM_CLIENT_ID,
    process.env.INSTAGRAM_CLIENT_SECRET,
    'https://api.instagram.com',
  )

  app.get('/oauth/instagram/connect', async (req, res) => {
    const clientId = process.env.INSTAGRAM_CLIENT_ID
    const url = process.env.INSTAGRAM_REDIRECT_URL
    return res.redirect(`https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${url}&response_type=code`)
  })
  
  app.get('/oauth/instagram/callback', (req, res) => {
    consumer.getOAuthAccessToken(
      req.query.code,
      {
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URL
      },
      (error, token) => {
        if (error) return res.send('Error')
        req.session.instagramToken = token
        consumer.getProtectedResource(
          'https://api.instagram.com/v1/users/self',
          token,
          (error, data) => {
            if (error) return res.send('Error')
            req.session.instagramUser = JSON.parse(data).data
            return res.redirect('/')
          }
        )
      }
    )
  })
}