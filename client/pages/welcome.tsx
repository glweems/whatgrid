/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { FPC } from '../@types'

interface Props extends WithRouterProps {
  existing: boolean
  hello: any
}

const WelcomePage: FPC<Props> = ({ router: { query }, hello }) => {
  console.log(query)
  return (
    <pre>
      <code>{hello}</code>
    </pre>
  )
}

export default withRouter(WelcomePage)
