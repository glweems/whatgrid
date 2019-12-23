import React, { createContext, useEffect, useState } from 'react'

import { User, useMeQuery, useMeLazyQuery } from '../components/Graphql'
import initialStore, { useStoreActions } from '../store'

type UserContextShape = null | User

const UserContext = createContext<UserContextShape>(null)

const UserProvider: React.FC<any> = ({ children }) => {
  const { data, loading } = useMeQuery()
  const { setUser, setGuest } = useStoreActions((actions) => actions.user)
  const [mounted, setMounted] = useState(false)
  const [store, setStore] = useState(initialStore)
  const q = useMeLazyQuery()
  console.log('TCL: UserProvider:React.FC -> q', q)

  useEffect(() => {
    if (!loading) {
      if (data?.me) setStore((state) => ({ ...state, user: data.me }))
      console.log('TCL: UserProvider:React.FC -> store', store)
    }
  }, [loading, data, store])

  if (loading) return '...loading'

  return children
}

export default UserProvider
