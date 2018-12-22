import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const INSERT_CART_ITEM_MUTATION = gql`
  mutation INSERT_CART_ITEM_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
    }
  }
`;

const AddToCart = ({ addToCart, children }) => children({ addToCart });

AddToCart.propTypes = {
  children: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default graphql(INSERT_CART_ITEM_MUTATION, {
  name: 'addToCart',
  options: props => ({
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
      },
    ],
    variables: {
      id: props.itemId,
    },
  }),
})(AddToCart);
