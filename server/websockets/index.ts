import * as addSession from 'express-socket.io-session'
import * as Io from 'socket.io'

import InstagramScraper from '../scrapers/instagram'

export default (server, {session}) => {
  const io = Io(server)

  io.use(addSession(session))

  io.on('connection', socket => {
    socket.on('begin scrape instagram', async () => {
      const instagramScraper = new InstagramScraper(socket.handshake.session.instagramToken)

      // while (instagramScraper.canScrape) {
        socket.emit('scraped instagram', await instagramScraper.scrape())
      // }
    })

    socket.on('disconnect', () => {
      console.log('disconnected!')
    })
  })
}