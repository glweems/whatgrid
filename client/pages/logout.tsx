import React from 'react'
import { NextPage, FC } from '../@types'

const LogoutPage: FC = () => {
  return <div>logout</div>
}

LogoutPage.getInitialProps = async ({ apolloClient }) => {
  console.log('TCL: LogoutPage.getInitialProps -> apolloClient', apolloClient)
  apolloClient.resetStore()
  return {}
}

export default LogoutPage
