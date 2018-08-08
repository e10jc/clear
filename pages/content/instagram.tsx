import * as React from 'react'

import Layout from '../../components/layout'
import {SocketContext} from '../_app'

interface Props {
  socket: SocketIOClient.Socket,
}

interface State {
  isScraping: boolean,
  posts: object[],
}

class InstagramContentPage extends React.Component<Props> {
  state = {
    isScraping: false,
    posts: [],
  }

  componentDidUpdate () {
    if (!this.state.isScraping && this.props.socket) {
      this.setState({...this.state, isScraping: true})
      this.props.socket.on('scraped instagram', this.handleInstagramScraped)
      this.props.socket.emit('begin scrape instagram')
    }
  }

  componentWillUnmount () {
    this.props.socket.emit('end scrape instagram')
    this.props.socket.off('scraped instagram', this.handleInstagramScraped)
  }

  render () {
    return <Layout>
      Instagram
    </Layout>
  }

  private handleInstagramScraped = (data) => {
    console.log('received:', data)
  }
}

export default () => <SocketContext.Consumer>
  {(socket) => <InstagramContentPage socket={socket} />}
</SocketContext.Consumer>