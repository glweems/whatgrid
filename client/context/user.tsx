import React, { useEffect } from 'react'
import { useMeQuery } from '../utils/generated'
import { useStoreActions } from '../store'

const UserProvider: React.FC<any> = ({ children }) => {
  const { data, loading, error } = useMeQuery()
  const { setUser, setLoading, clearSession } = useStoreActions(
    (actions) => actions.session
  )

  useEffect(() => {
    if (!loading) {
      if (error) clearSession()
      if (data?.me?.id) setUser(data.me)
      else setLoading(false)
    }
  }, [clearSession, data, error, loading, setLoading, setUser])

  return children
}

export default UserProvider
