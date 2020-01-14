/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro'
import useTheme from '../hooks/useTheme'
import { Store, useStoreActions } from '../store'
import { GlobalStyle } from '../utils/theme'
import { useMeQuery, MeDocument } from '../utils/generated'
import { Client } from '../types'

export const ProviderComposer: React.FC<{ contexts: any }> = ({
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

type Props = { apolloClient: Client; store: Store }

export const ContextProvider: FC<Props> = ({ children, apolloClient }) => {
  const { data, loading } = useMeQuery()
  // const [me, setMe] = useState(null)
  const { theme, componentMounted, toggleTheme } = useTheme()
  const { setSession } = useStoreActions((state) => state.session)
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current && !loading) {
      setSession(data)
    }
  })

  if (!componentMounted && loading) return <div />

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
