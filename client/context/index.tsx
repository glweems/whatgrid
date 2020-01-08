/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro'
import { ApolloClient } from 'apollo-boost'
import useTheme from '../hooks/useTheme'
import { useStoreActions, useStoreState } from '../store'
import { GlobalStyle } from '../utils/theme'
import { useMeQuery } from '../components/Graphql'

const ProviderComposer: React.FC<{ contexts: any }> = ({
  contexts,
  children
}: any) =>
  contexts.reduceRight(
    (kids: any, parent: any) =>
      React.cloneElement(parent, {
        children: kids
      }),
    children
  )

type Props = { client?: typeof ApolloClient; session?: any }

const ContextProvider: FC<Props> = ({ children, session }) => {
  const { theme, componentMounted, toggleTheme } = useTheme()
  const { data, loading, error } = useMeQuery()

  const { user } = useStoreState((state) => state.session)
  const { setUser, setLoading, clearSession } = useStoreActions(
    (actions) => actions.session
  )

  useEffect(() => {
    if (session.user?.id) setUser(session.user)
  }, [session.user, setUser])

  if (!componentMounted && session.loading) return <div />

  return (
    <ProviderComposer
      contexts={[<StyledThemeProvider theme={{ ...theme, toggleTheme }} />]}
    >
      {children}
      <GlobalStyle />
    </ProviderComposer>
  )
}

export default ContextProvider
