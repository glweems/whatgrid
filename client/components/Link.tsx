import React from 'react'
import { Flex, Box, Text, Link as RebassLink } from 'rebass/styled-components'
import NextLink from 'next/link'

interface Props {
  children: React.ReactNode
}

const Link: React.FC<Props> = ({ children }) => {
  return (
    <Flex px={2} color="white" bg="black" alignItems="center">
      <Text p={2} fontWeight="bold">
        {children}
      </Text>
      <Box mx="auto" />
      <NextLink href="#!">
        <RebassLink variant="nav">Profile</RebassLink>
      </NextLink>
    </Flex>
  )
}

export default Link
