import NextApp, {Container} from 'next/app'
import React from 'react'

export const SessionDataContext = React.createContext({})

class App extends NextApp {
  static async getInitialProps ({Component, ctx}) {
    return {
      componentProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
      sessionDataProps: {
        twitterUser: ctx.req ? ctx.req.session.twitterUser : {},
      },
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      sessionDataProps: props.sessionDataProps,
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