import React, { useEffect } from 'react'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
// import Next from 'next'
import gql from 'graphql-tag'
import { useUserQuery, useLogoutMutation } from '../../components/Graphql'
import { useStoreActions, useStoreState } from '../../store'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { NextPage } from '../../@types'

type Props = {
  profile: string
}

const ProfilePage: NextPage<Props> & any = ({ profile, me }) => {
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
