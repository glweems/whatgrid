import { NextPage as OldNextPage } from 'next'
import { Router } from 'next/router'

export interface PageProps extends AppProps {
  apolloClient: Client
  store: Store
  router: Router
}
export interface FPC<T = {}, I = any> extends React.SFC<T & PageProps> {
  getInitialProps?: (ctx: any) => Promise<P>
}
