import styled from 'styled-components'

interface Props {
  columns?: number
  gap?: number | string
}

const Form = styled.form<Props>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr);`};
  gap: ${({ gap }) => gap};
`

Form.displayName = 'Form'

export default Form
