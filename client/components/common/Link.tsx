import React from 'react'
import NextLink from 'next/link'
import { Text } from 'rebass/styled-components'

import { A } from './A'

interface Props {
  to: string
  text?: string
}

export const Link: React.FC<Props> = ({ to, children, text }) => {
  if (children)
    return (
      <NextLink href={to}>
        <A>{children}</A>
      </NextLink>
    )
  return (
    <NextLink href={to}>
      <A>
        <Text>{text}</Text>
      </A>
    </NextLink>
  )
}
