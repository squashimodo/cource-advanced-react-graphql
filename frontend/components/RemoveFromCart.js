import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
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
