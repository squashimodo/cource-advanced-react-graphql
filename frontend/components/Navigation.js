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
    text-decoration: none;
    font-weight: bold;
  }
`;

class Navigation extends Component {
  render() {
    return (
      <Menu>
        <MenuItem>
          <Link href="/">
            <a>Home</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
        </MenuItem>
      </Menu>
    );
  }
}

export default Navigation;