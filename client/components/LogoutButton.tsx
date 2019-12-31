import React from 'react'
import { Button } from 'rebass/styled-components'

const LogoutButton: React.FC = () => {
  const handleClick = () => {
    console.log('logout')
  }

  return (
    <Button variant="outline" onClick={handleClick}>
      Log out
    </Button>
  )
}

export default LogoutButton
