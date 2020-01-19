/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { StoreProvider, Store } from 'easy-peasy'
import { ThemeProvider } from 'styled-components/macro'
import { ApolloProvider } from 'react-apollo'
import useTheme from '../hooks/useTheme'
import { Client } from '../apollo/types'
import { GlobalStyle } from '../utils/theme'
import ProviderComposer from '../components/ProviderComposer'

type Props = { apolloClient: Client; store: Store }

export const ContextProvider: FC<Props> = ({
  children,
  apolloClient,
  store
}) => {
  const { componentMounted, theme, toggleTheme } = useTheme()

  if (!componentMounted) return <div />

  return (
    <ProviderComposer
      contexts={[
        <ApolloProvider client={apolloClient} />,
        <StoreProvider store={store} />,
        <ThemeProvider theme={{ ...theme, toggleTheme }} />
      ]}
    >
      {children}
      <GlobalStyle />
    </ProviderComposer>
  )
}

ContextProvider.displayName = 'ContextProviders'

export default ContextProvider
