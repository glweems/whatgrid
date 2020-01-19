import styled, { StyledComponent } from 'styled-components/macro';

interface Props {
  type?: 'button';
}

export const Button: StyledComponent<'button', Props> = styled.button`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 0.3em 0.3em 0;
  padding: 0.7em 1.4em;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 0.15em;
  box-shadow: inset 0 -0.6em 0 -0.35em;
  :active {
    top: 0.4em;
  }

  @media all and (max-width: 30em) {
    display: block;
    margin: 0.4em auto;
  }
`;

Button.defaultProps = {
  type: 'button'
};
