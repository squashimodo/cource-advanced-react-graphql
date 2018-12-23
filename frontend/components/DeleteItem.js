import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import { ALL_ITEMS_QUERY } from './Items';
import { CURRENT_USER_QUERY } from './User';

const StyledLink = styled('a')`
  text-decoration: ${({ loading }) => (loading ? 'line-through' : '')};
`;

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (
    cache,
    {
      data: {
        deleteItem: { id },
      },
    }
  ) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(d => d.id !== id);

    cache.writeQuery({
      query: ALL_ITEMS_QUERY,
      data,
    });
  };

  render() {
    const { id, children } = this.props;
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={{ id }}
        update={this.update}
      >
        {(deleteItem, { loading }) => (
          <Link href="#">
            <StyledLink
              href="#"
              loading={loading}
              onClick={async e => {
                e.preventDefault();
                if (confirm('Are you sure you want to delete this item?')) {
                  deleteItem()
                    .then(() => {
                      Router.push({
                        pathname: '/items',
                        query: {
                          deleted: id,
                        },
                      });
                    })
                    .catch(e => alert(e.message));
                }
              }}
            >
              {children}
            </StyledLink>
          </Link>
        )}
      </Mutation>
    );
  }
}

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteItem;
