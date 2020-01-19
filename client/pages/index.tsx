import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import uuid from 'uuid/v4'
import { Text } from 'rebass/styled-components'
import { animated } from 'react-spring'
import CssGrid from '../components/CssGrid'
import Layout from '../components/Layout'
import GridGapControl from '../components/GridGapControls'
import { useStoreActions, useStoreState } from '../store'
import Control from '../components/Control'
import Button from '../components/Button'
import { FPC } from '../@types'

const IndexPage: FPC = () => {
  return (
    <Layout sidebar={<Sidebar />}>
      <CssGrid />
    </Layout>
  )
}

export const Sidebar: React.FC = () => {
  const { rows, columns, gridGap } = useStoreState(({ grid }) => grid)
  const { addGridItem } = useStoreActions(({ grid }) => grid)

  const addRow = useCallback(async () => {
    addGridItem('row')
  }, [addGridItem])

  const addColumn = useCallback(async () => {
    addGridItem('column')
  }, [addGridItem])

  return (
    <Wrapper>
      <SidebarSection>
        <h3>Rows</h3>
        {rows.map((row) => (
          <Control key={uuid()} type="row" item={row} />
        ))}
        <Button variant="primary" onClick={addRow}>
          add row
        </Button>
      </SidebarSection>

      <SidebarSection>
        <Text>Columns</Text>
        <div>
          {columns.map((column) => (
            <Control key={uuid()} type="column" item={column} />
          ))}
        </div>
        <Button variant="primary" onClick={addColumn}>
          add column
        </Button>
      </SidebarSection>

      <SidebarSection>
        {gridGap.map((gap) => (
          <GridGapControl key={uuid()} {...gap} />
        ))}
      </SidebarSection>
    </Wrapper>
  )
}

const Wrapper = styled(animated.aside)`
  flex-direction: column;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
`

const SidebarSection = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  padding: 1em;
  border-radius: 0.25em;
`

export default IndexPage
