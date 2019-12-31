import React, { useEffect } from 'react'
import { useUserQuery } from '../components/Graphql'
import { useStoreActions, useStoreState } from '../store'
import Layout from '../components/Layout'

type Props = {
  userId: string
}
interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const UserPage: StatelessPage<Props> = ({ userId: profileId }) => {
  const { data, loading } = useUserQuery({
    variables: { id: profileId }
  })
  const { setSelectedUser, killUser } = useStoreActions((store) => store.user)
  const user = useStoreState((state) => state.user?.selected)

  useEffect(() => {
    if (!loading && !user?.id) setSelectedUser(data?.user)
    return () => {
      if (user?.id) killUser()
    }
  }, [data, killUser, loading, setSelectedUser, user])

  return <Layout>Post: {profileId}</Layout>
}

UserPage.getInitialProps = async ({ query }) => {
  return { userId: query.user }
}

export default UserPage
