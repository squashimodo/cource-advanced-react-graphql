import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { ItemPropTypes } from '../lib/propTypes';

export const INSERT_CART_ITEM_MUTATION = gql`
  mutation INSERT_CART_ITEM_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
      item {
        id
        title
        description
        image
        largeImage
        price
      }
    }
  }
`;

const AddToCart = ({ addToCart, children }) => children({ addToCart });

AddToCart.propTypes = {
  children: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  item: ItemPropTypes,
};

export default graphql(INSERT_CART_ITEM_MUTATION, {
  name: 'addToCart',
  options: props => ({
    update: (cache, { data }) => {
      // Grab the current user from the cache
      const { me } = cache.readQuery({
        query: CURRENT_USER_QUERY,
      });

      // Check if the user has this item in cart
      const [cartItem] = me.cart.filter(item => item.item.id === props.item.id);

      // If they have, find it and increase quantity by 1
      if (cartItem) {
        me.cart = me.cart.map(c =>
          c.id === cartItem.id
            ? {
                ...c,
                quantity:
                  c.quantity !== data.addToCart.quantity
                    ? c.quantity + 1
                    : c.quantity,
              }
            : c
        );
      } else {
        me.cart = [...me.cart, data.addToCart];
      }

      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          me,
        },
      });
    },
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
      },
    ],
    optimisticResponse: {
      __typename: 'Mutation',
      addToCart: {
        __typename: 'CartItem',
        id: '-1',
        createdAt: new Date(),
        quantity: 1,
        item: props.item,
      },
    },
    variables: {
      id: props.item.id,
    },
  }),
})(AddToCart);
