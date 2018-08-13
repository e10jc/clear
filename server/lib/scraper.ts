import * as cheerio from 'cheerio'
import * as puppeteer from 'puppeteer'
import {parse as parseSrcset} from 'srcset'

export default async (url, opts = {}) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const html = await page.content()
  browser.close()
  
  const $ = cheerio.load(html)
  const imgs = $('img.FFVAD').map(function (i) {
    const $this = $(this)
    const srcset = parseSrcset($this.attr('srcset'))
    const sortedSrcset = srcset.sort((a, b) => a.width <= b.width ? 1 : -1)
    return {
      caption: $this.attr('alt'),
      url: sortedSrcset[0].url,
    }
  }).get()
  
  return imgs
}