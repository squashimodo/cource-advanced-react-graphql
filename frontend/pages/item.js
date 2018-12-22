import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import SingleItem from '../components/SingleItem';
import Error from '../components/ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
    }
  }
`;

class Item extends Component {
  render() {
    const { id } = this.props.query;
    const variables = {
      id,
    };
    return (
      <div>
        <Query query={SINGLE_ITEM_QUERY} variables={variables}>
          {({ data: { item }, loading, error }) => {
            if (loading) return <h2>Loading..</h2>;
            if (error) return <Error error={error} />;
            if (!item) return <p>No item found for id {id}</p>;
            return <SingleItem item={item} />;
          }}
        </Query>
      </div>
    );
  }
}

export default Item;
