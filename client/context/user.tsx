import React, { useEffect } from 'react'
import { Text } from 'rebass/styled-components'
import { useMeQuery } from '../components/Graphql'
import { useStoreActions } from '../store'

const UserProvider: React.FC<any> = ({ children }) => {
  const { data, loading } = useMeQuery()
  const { setUser, setLoading } = useStoreActions((actions) => actions.session)

  useEffect(() => {
    if (!loading) {
      if (data?.me?.id) setUser(data.me)
      else setLoading(false)
    }
  }, [data, loading, setLoading, setUser])

  if (loading) return <Text>loading</Text>
  return children
}

export default UserProvider
