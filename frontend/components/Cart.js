import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation, graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;
const Cart = ({ open, toggleCart }) => (
  <CartStyles open={open}>
    <header>
      <CloseButton onClick={toggleCart} title="close">
        &times;
      </CloseButton>
      <Supreme>Your cart</Supreme>
      <p>You have xx items in your cart.</p>
    </header>
    <footer>
      <p>$10.00</p>
    </footer>
  </CartStyles>
);

Cart.propTypes = {
  open: PropTypes.bool,
  toggleCart: PropTypes.func,
};

Cart.defaultProps = {
  open: true,
  toggleCart() {},
};

export default compose(
  graphql(LOCAL_STATE_QUERY, {
    props: ({ data: { error, cartOpen } }) => ({
      error,
      open: cartOpen,
    }),
  }),
  graphql(TOGGLE_CART_MUTATION, {
    name: 'toggleCart',
  })
)(Cart);
