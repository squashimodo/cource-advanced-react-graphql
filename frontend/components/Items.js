import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = 8) {
    items(skip: $skip, first: $first) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const StyledItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 30px;
  margin: 0 auto;
`;

export { ALL_ITEMS_QUERY };
export default class Items extends Component {
  render() {
    const { page } = this.props;
    return (
      <Query
        query={ALL_ITEMS_QUERY}
        variables={{
          skip: page * 8 - 8,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading..';
          if (error) return `Error! ${error.message}`;

          return (
            <Center>
              <Pagination page={page} />
              <StyledItems>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}
              </StyledItems>
              <Pagination page={page} />
            </Center>
          );
        }}
      </Query>
    );
  }
}
