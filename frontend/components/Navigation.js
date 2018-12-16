import React, { Component } from 'react';
import Link from './Link';
import styled from 'styled-components';
import User from './User';
import Signout from './Logout';

const menuItems = [
  {
    label: 'Take me home! 🏠',
    href: '/',
    requrieAuth: false
  },
  {
    label: 'Buy stuff 🤑',
    href: '/items',
    requrieAuth: false

  },
  {
    label: 'Sell stuff 📈',
    href: '/sell',
    requireAuth: true
  },
  {
    label: 'Sign me up! ➕',
    href: '/signup',
    hideWhenLoggedIn: true,
    requireAuth: false
  },
  {
    label: 'Orders 📝',
    href: '/orders',
    requireAuth: true
  },
  {
    label: 'Favorites 💖',
    href: '/favorites',
    requireAuth: true
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
        <User>
          {({data: { me }}) => (
            <React.Fragment>
            {me && <Signout>{({signout}) => {
              return (
                <><MenuItem>{me.name}</MenuItem> <MenuItem><a href="#" onClick={async () => {
                  await signout();
                }}>Log out</a></MenuItem></>
              );
            }}</Signout>}
        {menuItems.filter(item => {
          if (me) {
            if (item.hideWhenLoggedIn) return false;
            if (item.requireAuth) return true
          } else {
            return item.requireAuth ? false : true
          }
        }).map(item => (
          <MenuItem key={`${item.href}${item.label}`}>
            <Link href={item.href}>
              <a>{item.label}</a>
            </Link>
          </MenuItem>
        ))}
        </React.Fragment>
        )}
        </User>
      </Menu>
    );
  }
}

export default Navigation;