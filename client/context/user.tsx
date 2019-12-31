import React from 'react'
import { useMeQuery } from '../components/Graphql'

const UserProvider: React.FC<any> = ({ children }) => {
  const data = useMeQuery()
  console.log('TCL: data', data)
  return children
}

export default UserProvider
