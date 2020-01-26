import React, { FC } from 'react';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import { FPC } from '../@types';
import { parseCookies } from '../lib/parseCookies';

interface Props {
  id: any;
}

const DashboardPage: FPC<Props> = ({ profile }) => {
  // const id = useStoreState(store => store?.session?.id);

  // if (loading) return <p>loading</p>;
  // if (error)
  //   return (
  //     <Layout>
  //       <pre>
  //         <code>{JSON.stringify(error)}</code>
  //       </pre>
  //     </Layout>
  //   );
  return (
    <Layout sidebar={<Sidebar />}>
      <div>
        <h2>{profile?.username}</h2>
      </div>
    </Layout>
  );
};

DashboardPage.getInitialProps = async ({ req, apolloClient }) => {
  // const id = await store?.getState()?.session?.id;

  const cookies = await parseCookies(req);

  const { data } = await apolloClient.query({
    query: gql`
      query Dashboard($id: ID!) {
        profile: user(id: $id) {
          id
          createdAt
          updatedAt
          email
          firstName
          lastName
          username
          phoneNumber
          grids {
            id
          }
        }
      }
    `,
    variables: { id: cookies.uid }
  });

  return {
    id: cookies.uid,
    profile: data.profile
  };

  // return { id };
};

const Sidebar: FC = () => (
  <div>
    <ul>
      <li key="245">grids</li>
      <li key="asdf">settings</li>
    </ul>
  </div>
);

export default DashboardPage;
