import React from 'react';
import { graphql } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';

const ToggleCart = ({ children, toggleCart }) => {
  return children(toggleCart);
};

export default graphql(TOGGLE_CART_MUTATION, {
  name: 'toggleCart',
})(ToggleCart);
