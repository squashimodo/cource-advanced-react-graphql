import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './Item';
import styled from 'styled-components';
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const StyledItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
`;

export default class Items extends Component {
  render() {
    return <Query query={ALL_ITEMS_QUERY}>
      {({loading, error, data}) => {
        if (loading) return "Loading.."
        if (error) return `Error! ${error.message}`;

        return (
          <StyledItems>
            {data.items.map(item => (
              <Item key={item.id} item={item} />
            ))}
          </StyledItems>
        )
      }}
    </Query>
  }
}