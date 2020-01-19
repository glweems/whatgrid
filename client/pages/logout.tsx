import React from 'react'
import { FPC } from '../@types'

const LogoutPage: FPC = () => {
  return <div>logout</div>
}

LogoutPage.getInitialProps = async ({ apolloClient }) => {
  console.log('TCL: LogoutPage.getInitialProps -> apolloClient', apolloClient)
  apolloClient.resetStore()
  return {}
}

export default LogoutPage
