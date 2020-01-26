// @flow

import React from 'react';
import styled from 'styled-components/macro';
import {
  space,
  layout,
  color,
  border,
  borderRadius,
  SpaceProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
  compose
} from 'styled-system';

type SystemProps = SpaceProps & LayoutProps & ColorProps & TypographyProps;

const system = compose(space, layout, color, border, borderRadius);

interface Props extends SystemProps {
  tag: keyof JSX.IntrinsicElements | React.ComponentType<Props>;
}

const StyledDynamicComponent = styled('p')(system);

const DynamicComponent: React.FC<Props> = ({
  tag = 'p',
  children,
  ...props
}) => {
  const WithComponent = StyledDynamicComponent.withComponent(tag);

  return <WithComponent {...props}>{children}</WithComponent>;
};

DynamicComponent.defaultProps = {
  tag: 'p'
};

export default DynamicComponent;
