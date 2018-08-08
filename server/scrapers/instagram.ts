import * as fetch from 'isomorphic-fetch'

export default class InstagramScraper {
  accessToken: string
  canScrape: boolean
  nextUrl: string

  constructor (accessToken) {
    this.accessToken = accessToken
    this.canScrape = true
  }

  async scrape () {
    const url = this.nextUrl || `https://api.instagram.com/v1/users/self/media/recent/?access_token=${this.accessToken}&count=10`
    const data = await fetch(url)
    const json = await data.json()

    if (json.data.length === 0) this.canScrape = false
    else this.nextUrl = json.pagination.next_url

    console.log(json)

    return json.data
  }
}