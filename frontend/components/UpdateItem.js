import React, { Component } from 'react';
import Input from './Input';
import { Query, graphql } from 'react-apollo';
import Form from './styles/Form';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Router from 'next/router';

const GET_ITEM_QUERY = gql`
  query GET_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      title,
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
  state = {}

  changeValue = e => {
    const { name, type, value } = e.target;
    this.setState({
      [name]: type === 'number' ? parseFloat(value) : value
    });
  }

  async submitForm(e, updateItemFn) {
    const { id } = this.props;

    e.preventDefault();

    this.setState({
      loadingMutation: true
    })
  
    try {
      const res = await updateItemFn({
        variables: {
          id,
          ...this.state
        }
      });

      this.setState({
        loading: false,
        error: null
      });

      Router.push({
        pathname: '/',
        // query: {
        //   id: id
        // }
      })
    } catch(error) {
      this.setState({
        loading: false,
        error: error
      })
    }
  
  }

  render() {
    const { id, mutate } = this.props;
    return (
      <Query query={GET_ITEM_QUERY} variables={{
        id: id
      }}>
        {({loading: loadingQuery , data: { item }}) => {
          if (loadingQuery) return <h1>Loading..</h1>;
          return (
            <Form onSubmit={(e) => this.submitForm(e, mutate)}>
              <ErrorMessage error={this.state.error}/>
              <fieldset disabled={this.state.loadingMutation} aria-busy={this.state.loadingMutation}>
                <Input
                  onChange={this.changeValue}
                  title="Title"
                  placeholder="Title"
                  defaultValue={item.title}
                  propName="title" />
                <Input
                  type="number"
                  title="Price"
                  onChange={this.changeValue}
                  defaultValue={item.price}
                  propName="price" />
                <Input
                  type="textarea"
                  onChange={this.changeValue}
                  title="Description"
                  placeholder="Description"
                  defaultValue={item.description}
                  propName="description" />
              </fieldset>
              <button type="submit">{ this.state.loadingMutation ? 'Saving..' : 'Save item'}</button>
            </Form>)
          }}
      </Query>
    );
  }
}

export default graphql(UPDATE_ITEM_MUTATION)(UpdateItem)
export { UPDATE_ITEM_MUTATION };