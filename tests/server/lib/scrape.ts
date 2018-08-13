import scraper from '../../../server/lib/scraper'

test('scrapes instagram images', async () => {
  const images = await scraper('https://www.instagram.com/lifeofsarahmiller/', {})
  expect(images.length).toBe(12)
}, 0)