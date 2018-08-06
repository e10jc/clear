import Layout from '../components/layout'

const HomePage = () => <Layout>
  <ul>
    <li>
      <a href='/oauth/facebook/connect'>Facebook connect</a>
    </li>
    <li>
      <a href='/oauth/twitter/connect'>Twitter connect</a>
    </li>
  </ul>
</Layout>

export default HomePage
