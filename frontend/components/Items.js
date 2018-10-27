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
  display: flex;
  flex-wrap: wrap;
  margin: -20px;
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
              <Item {...item} />
            ))}
          </StyledItems>
        )
      }}
    </Query>
  }
}