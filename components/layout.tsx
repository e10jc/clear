import Link from 'next/link'

import {SessionDataContext} from '../pages/_app'

export default ({children}) => <SessionDataContext.Consumer>
  {({facebookUser, instagramUser, redditUser, twitterUser}) => <div>
    <h1>
      <Link href='/'><a>Clear</a></Link>
    </h1>

    {children}

    <ul>
      <li>Facebook user: {facebookUser && facebookUser.id}</li>
      <li>Instagram user: {instagramUser && instagramUser.id}</li>
      <li>Twitter user: {twitterUser && twitterUser.id}</li>
      <li>Reddit user: {redditUser && redditUser.id}</li>
    </ul>

    <ul>
      <li>
        <Link href='/about'><a>About</a></Link>
      </li>
    </ul>
  </div>}
</SessionDataContext.Consumer>