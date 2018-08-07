import * as React from 'react'

import Layout from '../../components/layout'

export default class InstagramContentPage extends React.Component<{}> {
  static async getInitialProps (ctx) {
    console.log(ctx.req && ctx.req.session)
  }

  render () {
    return <Layout>
      Instgram
    </Layout>
  }
}
