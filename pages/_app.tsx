import NextApp, {Container} from 'next/app'
import * as React from 'react'

export const SessionDataContext = React.createContext({
  facebookUser: null,
  instagramUser: null,
  twitterUser: null,
})

interface Props {
  componentProps: any,
  sessionDataProps: any,
}

class App extends NextApp<Props> {
  state = {
    sessionDataProps: this.props.sessionDataProps,
  }

  static async getInitialProps ({Component, ctx}) {
    return {
      componentProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
      sessionDataProps: {
        facebookUser: ctx.req ? ctx.req.session.facebookUser : {},
        instagramUser: ctx.req ? ctx.req.session.instagramUser : {},
        twitterUser: ctx.req ? ctx.req.session.twitterUser : {},
      },
    }
  }

  render () {
    const {Component, componentProps} = this.props
    return <Container>
      <SessionDataContext.Provider value={this.state.sessionDataProps}>
        <Component {...componentProps} />
      </SessionDataContext.Provider>
    </Container>
  }
}

export default App