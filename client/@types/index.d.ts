import { NextPage as OldNextPage } from 'next'

export interface NextPage<P = {}> extends OldNextPage<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

interface Session {
  user?: {
    id: string
  }
}

export interface FC<P = {}> extends React.SFC<P & SessionProps> {
  getInitialProps?: (ctx: any) => Promise<P>
}
