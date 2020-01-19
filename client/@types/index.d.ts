import { Router } from 'next/router';

export interface PageProps<T> extends T {
  apolloClient: Client;
  store: Store;
  router: Router;
  children: React.ReactNode;
}
export interface FPC<T = {}, I = any> extends React.SFC<T & PageProps> {
  getInitialProps?: (ctx: any) => Promise<P>;
}
