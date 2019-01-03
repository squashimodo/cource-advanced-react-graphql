import React from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import Nav from './Navigation';
import Cart from './Cart';
import AutoComplete from './Search';

const floating = keyframes`
  from {
    transform: translate(0, 0px) rotateY(-17deg);
    text-shadow: 7px 7px 3px rgba(0,0,0,0.15);
  }
  50% {
    transform: translate(0, 14px) rotateY(7deg) rotateX(7deg);
    text-shadow: -7px -7px 3px rgba(0,0,0,0.2);
  }
  to {
    transform: translate(0, 0px) rotateY(-14deg);
    text-shadow: 7px 7px 3px rgba(0,0,0,0.15);
  }
`;

const Logo = styled.h1`
  animation: ${floating} 20s infinite;
  font-size: 6rem;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 2;
  transform: skew(-10deg);
  font-family: RadnikaNext;
  padding: 30px 0 30px 28px;

  a {
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.orangeGradient};
    color: white;
    text-decoration: none;
    text-transform: uppercase;
  }

  @media (min-width: 1300px) {
    margin-left: 2rem;
    font-size: 4rem;
    text-align: left;
  }
`;

const StyledHeader = styled.header`
  background: ${({ theme }) => theme.blueGradient}}
  .bar {
    border-bottom: 7px solid ${({ theme }) => theme.black};
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: stretch;
    @media (min-width: 1300px) {
      grid-template-columns: auto 1fr;
      justify-content: space-between;
    }
  }
  .sub-bar {
    border-bottom: 1px solid ${({ theme }) => theme.offWhite}
  }
`;

const Search = styled.input.attrs({
  type: 'text',
  placeholder: 'What are you looking for?',
})`
  width: 100%;
  padding: 10px;
  font-size: rem;
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Things for sale</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <AutoComplete />
    </div>
    <Cart />
  </StyledHeader>
);

export default Header;
