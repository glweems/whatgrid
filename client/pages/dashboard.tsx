import React from 'react'
import { NextPage } from '../@types'
import Layout from '../components/Layout'

interface Props {
  id: any
}

const DashboardPage: NextPage<Props> = ({ id }) => {
  return <Layout>{id}</Layout>
}

DashboardPage.getInitialProps = async ({ client, query, rest }) => {
  return { id: 12345 }
}

export default DashboardPage
