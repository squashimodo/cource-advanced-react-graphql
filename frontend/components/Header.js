import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Navigation';
const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  font-family: RadnikaNext;

  a {
    padding: 0.5rem 1rem;
    background: ${({theme}) => theme.red};
    color: white;
    text-decoration: none;
    text-transform: uppercase;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 7px solid ${({theme}) => theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    border-bottom: 3px solid ${({theme}) => theme.offWhite}
  }
`;

const Search = styled.input.attrs({
  type: 'text',
  placeholder: 'What are you looking for?'
})`
  width: 100%;
  padding: 10px;
  font-size: rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href=""><a>Things for sale</a></Link>
        </Logo>
        <Nav></Nav>
      </div>
      <div className="sub-bar">
        <Search></Search>
      </div>
      <div className="cart"></div>
    </StyledHeader>
  );
};

export default Header;