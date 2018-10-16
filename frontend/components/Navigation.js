import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Menu = styled.ul`
  list-style: none;
  display: flex;
`;

const MenuItem = styled.li`
  margin: 0 10px;
  transform: skew(-7deg);
  padding: 10px;
  font-family: RadnikaNext;

  a {
    display: block;
    color: ${({theme}) => theme.offWhite};
    text-decoration: none;
    font-weight: bold;
    transition: all .1s ease-in-out;
    &:hover {
      transform: scale(1.3);
    }
  }
`;

class Navigation extends Component {
  render() {
    return (
      <Menu>
        <MenuItem>
          <Link href="/">
            <a>Go Home!</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/buy">
            <a>Buy stuff!</a>
          </Link>
        </MenuItem>
      </Menu>
    );
  }
}

export default Navigation;