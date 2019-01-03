import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import FavoriteCard from './FavoriteCard';
import { INSERT_CART_ITEM_MUTATION } from './AddToCart';
import { REMOVE_FAVORITE_MUTATION } from './ToggleFavorite';

const Favorites = ({
  data: { favorites, loading },
  removeFavorite,
  addToCart,
}) => {
  async function moveToCart(id) {
    await addToCart({
      variables: {
        id,
      },
    });

    await removeFavorite({
      variables: {
        id,
      },
    });
  }

  if (loading) return <p>Loading..</p>;
  return (
    <div>
      {favorites.map(({ id, item }) => (
        <FavoriteCard key={id} item={item} moveToCart={moveToCart} />
      ))}
    </div>
  );
};

Favorites.propTypes = {};

const FAVORITES_QUERY = gql`
  query FAVORITES_QUERY {
    favorites {
      id
      item {
        id
        title
        description
        image
      }
    }
  }
`;

export default compose(
  graphql(INSERT_CART_ITEM_MUTATION, {
    name: 'addToCart',
  }),
  graphql(REMOVE_FAVORITE_MUTATION, {
    name: 'removeFavorite',
    options: {
      refetchQueries: [{ query: FAVORITES_QUERY }],
    },
  }),
  graphql(FAVORITES_QUERY)
)(Favorites);
