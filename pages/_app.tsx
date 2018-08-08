import NextApp, {Container} from 'next/app'
import * as React from 'react'
import * as io from 'socket.io-client'

export const SessionDataContext = React.createContext({
  facebookUser: null,
  instagramUser: null,
  redditUser: null,
  twitterUser: null,
})

export const SocketContext = React.createContext(null)

interface Props {
  componentProps: any,
  sessionDataProps: any,
}

class App extends NextApp<Props> {
  static async getInitialProps ({Component, ctx}) {
    return {
      componentProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
      sessionDataProps: {
        facebookUser: ctx.req ? ctx.req.session.facebookUser : {},
        instagramUser: ctx.req ? ctx.req.session.instagramUser : {},
        redditUser: ctx.req ? ctx.req.session.redditUser : {},
        twitterUser: ctx.req ? ctx.req.session.twitterUser : {},
      },
    }
  }

  state = {
    sessionDataProps: this.props.sessionDataProps,
    socket: null,
  }

  componentDidMount () {
    this.setState({...this.state, socket: io()})
  }

  componentWillUnmount () {
    this.state.socket.close()
  }

  render () {
    const {Component, componentProps} = this.props
    return <Container>
      <SessionDataContext.Provider value={this.state.sessionDataProps}>
        <SocketContext.Provider value={this.state.socket}>
          <Component {...componentProps} />
        </SocketContext.Provider>
      </SessionDataContext.Provider>
    </Container>
  }
}

export default App