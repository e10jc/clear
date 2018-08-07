import Link from 'next/link'

import Layout from '../components/layout'

const HomePage = () => <Layout>
  <ul>
    <li>
      <a href='/oauth/facebook/connect'>Facebook connect</a>
    </li>
    <li>
      <a href='/oauth/Instagram/connect'>Instagram connect</a>
    </li>
    <li>
      <a href='/oauth/twitter/connect'>Twitter connect</a>
    </li>
    <li>
      <a href='/oauth/reddit/connect'>Reddit connect</a>
    </li>
  </ul>

  <ul>
    <li>
      <Link href='/content/instagram'><a>Instagram content</a></Link>
    </li>
  </ul>
</Layout>

export default HomePage
