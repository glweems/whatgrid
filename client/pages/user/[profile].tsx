import React from 'react'
import Layout from '../../components/Layout'
import { FPC } from '../../@types'

type Props = {
  profile: string
}

const ProfilePage: FPC<Props> & any = ({ profile, me }) => {
  return (
    <Layout>
      <p>Profile: {profile.email}</p>
      <pre>
        <code>{JSON.stringify({ profile, me }, null, 2)}</code>
      </pre>
    </Layout>
  )
}

ProfilePage.getInitialProps = async ({ client, query, rest }) => {
  console.log('TCL: ProfilePage.getInitialProps -> rest', rest)
  const {
    data: { profile, me }
  } = await client.query({
    // query: ProfileQuery,
    variables: { id: query.profile }
  })
  console.log('TCL: ProfilePage.getInitialProps -> me', me)
  return { profile, me }
}

export default ProfilePage
