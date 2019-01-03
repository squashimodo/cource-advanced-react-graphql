import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ToggleFavorite = ({
  children,
  addFavorite,
  removeFavorite,
  favorites,
  id,
}) => {
  function toggleFavorite() {
    return favorites.find(f => f.item.id === id) ? removeFavorite : addFavorite;
  }

  return children({ toggleFavorite: toggleFavorite() });
};

ToggleFavorite.propTypes = {
  id: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
      }).isRequired,
    }).isRequired
  ).isRequired,
  children: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export const ADD_FAVORITE_MUTATION = gql`
  mutation ADD_FAVORITE_MUTATION($id: ID!) {
    addFavorite(itemId: $id) {
      id
      item {
        id
      }
    }
  }
`;

export const REMOVE_FAVORITE_MUTATION = gql`
  mutation REMOVE_FAVORITE_MUTATION($id: ID!) {
    removeFavorite(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(ADD_FAVORITE_MUTATION, {
    name: 'addFavorite',
    options: props => ({
      update: (cache, { data: { addFavorite } }) => {
        const { me } = cache.readQuery({
          query: CURRENT_USER_QUERY,
        });

        if (me.favorites.find(f => f.item.id === addFavorite.id)) return;

        cache.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            me: {
              ...me,
              favorites: [...me.favorites, { ...addFavorite }],
            },
          },
        });
      },

      optimisticResponse: {
        __typename: 'Mutation',
        addFavorite: {
          __typename: 'Favorite',
          id: '-1',
          item: {
            __typename: 'Item',
            id: props.id,
          },
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
  }),
  graphql(REMOVE_FAVORITE_MUTATION, {
    name: 'removeFavorite',
    options: props => ({
      update: (cache, { data: { removeFavorite } }) => {
        const { me } = cache.readQuery({
          query: CURRENT_USER_QUERY,
        });

        const { id } =
          removeFavorite.id === '-1'
            ? me.favorites.find(f => f.item.id === props.id)
            : removeFavorite;

        cache.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            me: {
              ...me,
              favorites: me.favorites.filter(f => f.id !== id),
            },
          },
        });
      },

      optimisticResponse: {
        __typename: 'Mutation',
        removeFavorite: {
          id: '-1',
          __typename: 'Favorite',
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
  })
)(ToggleFavorite);
