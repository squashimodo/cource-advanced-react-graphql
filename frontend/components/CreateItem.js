import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import formatCurrency from '../lib/formatMoney';
import gql from 'graphql-tag';
import ErrorMessage from '../components/ErrorMessage';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
  # The CREATE_ITEM_MUTATION will take a set of parameters
  # It's like a function..
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    # The parameters will be passed to createItem
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) { # Return the ID of the created item
      id
    }
  }
`;

export { CREATE_ITEM_MUTATION };

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: 'https://placekitten.com/800/500',
    largeitem: 'https://placekitten.com/800/500',
    price: 0
  }

  // Arrow function, because it doesnt rebind 'this'.
  changeValue = e => {
    const { name, type, value } = e.target;
    this.setState({
      [name]: type === 'number' ? parseFloat(value) : value
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}>
        {(createItem, { loading, error, called, data }) => (
          <Form onSubmit={async (e) => {
            // Prevent the form to post
            e.preventDefault();

            // Call the mutation
            const res = await createItem();

            // Go to item page
            Router.push({
              pathname: '/item',
              query: {
                id: res.data.createItem.id
              }
            })
          }}>
          <ErrorMessage error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
              <Input
                onChange={this.changeValue}
                title="Title"
                placeholder="Title"
                value={this.state.title}
                propName="title" />
              <Input
                type="number"
                title="Price"
                onChange={this.changeValue}
                value={this.state.price}
                propName="price" />
              <Input
                type="textarea"
                onChange={this.changeValue}
                title="Description"
                placeholder="Description"
                value={this.state.description}
                propName="description" />
            </fieldset>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Mutation>
    );
  }
}


const Input = ({ title, type = 'text', propName, placeholder = '', value, onChange, ...props }) => {
  const Tag = type === 'textarea' ? 'textarea' : 'input';
  return (<label htmlFor={propName}>
    {title}
    <Tag
      {...props}
      id={propName}
      type={type}
      name={propName}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </label>)
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  propName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default CreateItem;