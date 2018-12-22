import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Input from './Input';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const GET_ITEM_QUERY = gql`
  query GET_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    # The parameters will be passed to updateItem
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  changeValue = e => {
    const { name, type, value } = e.target;
    this.setState({
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  async submitForm(e, updateItemFn) {
    const { id } = this.props;

    e.preventDefault();

    this.setState({
      loadingMutation: true,
    });

    try {
      await updateItemFn({
        variables: {
          id,
          ...this.state,
        },
      });

      this.setState({
        loading: false,
        error: null,
      });

      Router.push({
        pathname: '/',
        // query: {
        //   id: id
        // }
      });
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
    }
  }

  render() {
    const { id, updateItem } = this.props;
    const { loadingMutation, error } = this.state;
    return (
      <Query
        query={GET_ITEM_QUERY}
        variables={{
          id,
        }}
      >
        {({ loading: loadingQuery, data: { item } }) => {
          if (loadingQuery) return <h1>Loading..</h1>;
          return (
            <Form onSubmit={e => this.submitForm(e, updateItem)}>
              <ErrorMessage error={error} />
              <fieldset disabled={loadingMutation} aria-busy={loadingMutation}>
                <Input
                  onChange={this.changeValue}
                  title="Title"
                  placeholder="Title"
                  defaultValue={item.title}
                  propName="title"
                />
                <Input
                  type="number"
                  title="Price"
                  onChange={this.changeValue}
                  defaultValue={item.price}
                  propName="price"
                />
                <Input
                  type="textarea"
                  onChange={this.changeValue}
                  title="Description"
                  placeholder="Description"
                  defaultValue={item.description}
                  propName="description"
                />
              </fieldset>
              <button type="submit">
                {loadingMutation ? 'Saving..' : 'Save item'}
              </button>
            </Form>
          );
        }}
      </Query>
    );
  }
}

UpdateItem.propTypes = {
  id: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
};

export default graphql(UPDATE_ITEM_MUTATION, {
  name: 'updateItem',
})(UpdateItem);
export { UPDATE_ITEM_MUTATION };
