import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import formatCurrency from '../lib/formatMoney';
import gql from 'graphql-tag';

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeitem: '',
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
      <Form>
        <fieldset>
        <Input
          onChange={this.changeValue}
          title="Title"
          placeholder="Title"
          value={this.state.title}
          propName="title"/>
        <Input
          type="number"
          title="Price"
          onChange={this.changeValue}
          value={this.state.price}
          propName="price"/>
        <Input
          type="textarea"
          onChange={this.changeValue}
          title="Description"
          placeholder="Description"
          value={this.state.description}
          propName="description"/>
        </fieldset>
      </Form>
    );
  }
}


const Input = ({ title, type = 'text', propName, placeholder = '', value, onChange, ...props}) => {
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