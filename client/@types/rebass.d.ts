declare module 'rebass/styled-components' {
  import * as r from 'rebass'
  import { CSSObject, StyledComponent } from 'styled-components/macro'

  export interface BaseProps {
    sx?: CSSObject
  }
  export = r
}
