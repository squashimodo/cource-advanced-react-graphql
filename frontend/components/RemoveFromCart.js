import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = ({ children, removeFromCart }) =>
  children(removeFromCart);

RemoveFromCart.propTypes = {
  children: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default graphql(REMOVE_FROM_CART_MUTATION, {
  name: 'removeFromCart',
  options: props => ({
    // Update method is called as soon as we get a response back from the server after a mutation has been performed
    update: (cache, { data }) => {
      // Read the cache
      const { me } = cache.readQuery({
        query: CURRENT_USER_QUERY,
      });

      // Remove the item
      const cartItemId = data.removeFromCart.id;

      me.cart = me.cart.filter(item => item.id !== cartItemId);
      // Write it back to the cache

      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          me,
        },
      });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      removeFromCart: {
        id: props.id,
        __typename: 'CartItem',
      },
    },
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
      },
    ],
    variables: {
      id: props.id,
    },
  }),
})(RemoveFromCart);
