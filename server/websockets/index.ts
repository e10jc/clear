import * as addSession from 'express-socket.io-session'
import * as Io from 'socket.io'

import scraper from '../lib/scraper'

export default (server, {session}) => {
  const io = Io(server)

  io.use(addSession(session))

  io.on('connection', socket => {
    socket.on('begin scrape instagram', async () => {
        socket.emit('scraped instagram', await scraper(
          'https://www.instagram.com/e10jc/',
          {
            
          }
        ))
    })

    socket.on('disconnect', () => {
      console.log('disconnected!')
    })
  })
}