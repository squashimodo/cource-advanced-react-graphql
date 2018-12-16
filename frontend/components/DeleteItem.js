import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { ALL_ITEMS_QUERY } from './Items';

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
    const { id } = this.props;
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: id }}
        update={this.update}>
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
              }}>
              {this.props.children}
            </StyledLink>
          </Link>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
