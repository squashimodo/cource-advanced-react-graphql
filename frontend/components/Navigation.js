import React, { Component } from 'react';
import Link from './Link';
import styled from 'styled-components';

const menuItems = [
  {
    label: 'Take me home! 🏠',
    href: '/'
  },
  {
    label: 'Buy stuff 🤑',
    href: '/items'
  },
  {
    label: 'Sell stuff 📈',
    href: '/sell'
  },
  {
    label: 'Sign me up! ➕',
    href: '/signup'
  },
  {
    label: 'Orders 📝',
    href: '/orders'
  },
  {
    label: 'Favorites 💖',
    href: '/favorites'
  },
];

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
    position: relative;
    color: ${({theme}) => theme.offWhite};
    text-decoration: none;
    font-weight: bold;
    transition: transform .1s ease-in-out;
  
    &:hover, &:focus, &.active {
      transform: scale(1.3);
    }

    &:hover:after, &.active:after {
      width: 90%;
    }

    &:after {
      transition: width .1s ease-in-out;
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      right: 0;
      height: 3px;
      margin: 0 auto;
      background: ${({theme}) => theme.orangeGradient};
      width: 0%;
    }
  }
`;

class Navigation extends Component {
  render() {
    return (
      <Menu>
        {menuItems.map(item => (
          <MenuItem key={`${item.href}${item.label}`}>
            <Link href={item.href}>
              <a>{item.label}</a>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    );
  }
}

export default Navigation;