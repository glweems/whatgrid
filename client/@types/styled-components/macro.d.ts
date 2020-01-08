// import original module declarations
import 'styled-components/macro'
import { Theme } from '../../utils/theme'

// and extend them!
declare module 'styled-components/macro' {
  export interface DefaultTheme extends Theme {
    name: 'whatgrid'
    toggleTheme: () => void
  }
}
