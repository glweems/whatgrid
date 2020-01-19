import styled, { StyledComponent } from 'styled-components';
import { grid, GridProps, padding, SpaceProps } from 'styled-system';

type Props = GridProps & SpaceProps;
type FormProps = React.ReactHTMLElement<HTMLFormElement>;
export const Form: StyledComponent<'form', FormProps, Props> = styled.form`
  ${grid};
  ${padding};
  display: grid;
  justify-content: stretch;
  justify-items: stretch;

  [type='submit'] {
    align-self: flex-end;
    text-align: center;
  }
`;

Form.defaultProps = {
  gridGap: '1em',
  gridTemplateColumns: '100%',
  gridAutoRows: '1fr',
  padding: 1
};

Form.displayName = 'Form';
