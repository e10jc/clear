const STATE = 'd29n'

module.exports = app => {
  app.get('/oauth/facebook/connect', async (req, res) => {
    const appId = process.env.FACEBOOK_APP_ID
    const url = process.env.FACEBOOK_REDIRECT_URL
    res.redirect(`https://www.facebook.com/v3.1/dialog/oauth?client_id=${appId}&redirect_uri=${url}&state=${STATE}`)
  })
  
  app.get('/oauth/facebook/callback', (req, res) => {
    res.send('cool')
  })
}