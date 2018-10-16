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
  bs: '0 12px 24px 0 rgba(0,0,0,.09)',
  asphaltBackground: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png"), linear-gradient(-45deg, rgb(53,54,67), rgb(33,36,43))',
  blueGradient: 'linear-gradient(to right, #1e3c72, #2a5298)',
  orangeGradient: 'linear-gradient(-45deg, rgb(255,120,40), rgb(255,102,6))',
};

injectGlobal`
  @font-face {
    font-family: RadnikaNext;
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: RadnikaNext;
  }

  a {
    text-decoration: none;
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