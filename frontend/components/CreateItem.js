import React, { Component } from 'react';
import Input from './Input';
import { graphql } from 'react-apollo';
import Form from './styles/Form';
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

  uploadFile = async (e) => {
    const [file] = e.target.files;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Sellstuff');

    const res = await fetch('https://api.cloudinary.com/v1_1/hbentlov/image/upload', {
      method: 'POST',
      body: data
    });

    const jsonData = await res.json();
    this.setState({
      image: jsonData.secure_url,
      largeImage: jsonData.eager[0].secure_url
    })
  }

  render() {
    const { mutate: createItem } = this.props;
    const { loading, error } = this.state;
    return (
      <Form onSubmit={async (e) => {
        // Prevent the form to post
        e.preventDefault();

        this.setState({
          loading: true
        })

        // Call the mutation
        try {
          const { data: { createItem: { id } } } = await createItem({
            variables: this.state,
            // optimisticResponse: {
            //   createItem: {
            //     __typename: 'Item',
            //     id: -1,
            //     ...this.state
            //   },
            // },
          });

          this.setState({
            loading: false,
            error: null
          })

          // Go to item page
        Router.push({
          pathname: '/',
          // query: {
          //   id: id
          // }
        })
        } catch(e) {
          this.setState({
            loading: false,
            error: e
          })
        }
      }}>
      <ErrorMessage error={error}/>
        <fieldset loading={loading} aria-loading={loading}>
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
            <Input
            type="file"
            onChange={this.uploadFile}
            title="Upload file"
            placeholder="Upload file"
            propName="image" />
        </fieldset>
        <button type="submit">Submit</button>
      </Form>
    );
  }
}

//export default CreateItem;
export default graphql(CREATE_ITEM_MUTATION)(CreateItem)
export { CREATE_ITEM_MUTATION };