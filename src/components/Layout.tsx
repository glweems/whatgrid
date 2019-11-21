import { graphql, useStaticQuery } from 'gatsby';
import React, { ReactNode, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import styled, { StyledComponent } from 'styled-components/macro';
import { ThemeContext } from './ContextProvider';

const DefaultMain = styled.main``;
interface Props {
  children: ReactNode;
  Main?: StyledComponent<'main', React.ReactElement, {}, never>;
}

export default ({ children, Main = DefaultMain }: Props) => {
  const { toggleTheme } = useContext(ThemeContext);
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          languageCode
          countryCode
        }
      }
    }
  `);

  return (
    <>
      <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title}>
        <html lang={data.site.siteMetadata.languageCode} />
        <meta name="description" content={data.site.siteMetadata.description} />

        <meta
          property="og:locale"
          content={`${data.site.siteMetadata.languageCode}_${data.site.siteMetadata.countryCode}`}
        />
      </Helmet>

      <header>{/* TODO */}</header>

      <button type="button" onClick={toggleTheme}>
        toggle theme
      </button>

      <Main>{children}</Main>

      <footer>{/* TODO */}</footer>
    </>
  );
};
