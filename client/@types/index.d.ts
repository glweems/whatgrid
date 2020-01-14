import { NextPage as OldNextPage } from 'next'

export interface NextPage<P = {}> extends OldNextPage<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

interface Session {
  user?: {
    id: string
  }
}

export interface FC<Props = {}> extends React.SFC<Props & SessionProps> {
  getInitialProps?: (ctx: any) => Promise<P>
}
