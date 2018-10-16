import React, { Component } from 'react';
import Header from './Header';
import Meta from './Meta';
import styled, { ThemeProvider, injectGlobal} from 'styled-components';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0,0,0,.09)'
};

injectGlobal`
  @font-face {
    font-family: RadnikaNext;
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: RadnikaNext;
  }
`;

const StyledPage = styled.div`
  background: white;
  color: ${({theme}) => theme.maxWidth};
`;

const Inner = styled.div`
  max-width: ${({theme}) => theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>
            {children}
          </Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;