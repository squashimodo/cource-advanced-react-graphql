import React from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import Nav from './Navigation';
import Cart from './Cart';

const floating = keyframes`
  from {
    transform: translate(0, 0px) rotateY(-12deg);
    text-shadow: 7px 7px 3px rgba(0,0,0,0.15);
  }
  50% {
    transform: translate(0, 10px) rotateY(5deg) rotateX(5deg);
    text-shadow: -7px -7px 3px rgba(0,0,0,0.15);
  }
  to {
    transform: translate(0, 0px) rotateY(-8deg);
    text-shadow: 7px 7px 3px rgba(0,0,0,0.15);
  }
`;

const Logo = styled.h1`
  animation: ${floating} 20s infinite;
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-10deg);
  font-family: RadnikaNext;
  padding: 100px 0 30px 0;

  a {
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.orangeGradient};
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

const Header = () => {
  return (
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
        <Search />
      </div>
      <Cart />
    </StyledHeader>
  );
};

export default Header;
