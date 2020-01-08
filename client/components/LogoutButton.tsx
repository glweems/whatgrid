import React from 'react'
import Button from './Button'
import { useLogoutMutation } from './Graphql'

const LogoutButton: React.FC = () => {
  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    logout()
  }

  return <Button onClick={handleLogout}>Log out</Button>
}

export default LogoutButton
