import React, { FC } from 'react'
import { NextPage } from '../@types'
import Layout from '../components/Layout'

interface Props {
  id: any
}

const DashboardPage: NextPage<Props> = ({ id }) => {
  return <Layout sidebar={<Sidebar />}>{id}</Layout>
}

DashboardPage.getInitialProps = async ({ client, query, rest }) => {
  return { id: 12345 }
}

const Sidebar: FC = () => (
  <div>
    <ul>
      <li key="245">grids</li>
      <li key="asdf">settings</li>
    </ul>
  </div>
)

export default DashboardPage
