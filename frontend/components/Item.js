import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import formatCurrency from '../lib/formatMoney';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CREATE_ITEM_MUTATION } from './CreateItem';
import Router from 'next/router';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION(
    $id: ID!
  ) {
    deleteItem(
      id: $id
    ) {
      id
    }
  }
`;

export { DELETE_ITEM_MUTATION };


const StyledItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 450px;

  box-shadow: 1px 5px 12px 2px #0000000d;;
  border-radius: 10px;

  font-family: RadnikaNext;

  .item__title {
    position: absolute;
    top: 190px;
    align-self: center;
    background: ${({theme}) => theme.orangeGradient};
    color: white;
    font-family: RadnikaNext;
    padding: 5px 10px;
    margin-bottom: 30px;
    margin-top: -11px;
    transform: rotate(${() => (Math.random() * 10)-5}deg);
  }

  .item__description {
    text-align: center;
  }

  .item__price {
    position: absolute;
    top: -5px;
    right: -1%;
    padding: 5px 10px;
    background: ${({theme}) => theme.orangeGradient};
    transform: rotate(${() => (Math.random() * 6)-3}deg);
    color: white;
    font-family: RadnikaNext;
  }
  .item__actions {
    justify-self: flex-end;
    display: flex;
    border-top: 1px solid #e6e6e6;
    > * {
      display: flex;
      justify-content: center;
      flex-grow: 1;
      border-right: 1px solid #e6e6e6;
      &:last-child {
        border-right: none;
      }
    }
  }

  .item__image {
    background-image: url(${(props) => props.image });
    background-size: cover;
    background-position: center center;
    height: 200px;
  }
`;

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  render() {
    const { id, title, description, price, image } = this.props.item; 
    return (
      <StyledItem {...this.props.item} className="item">
        <div className="item__title"><Link href={{
          pathname: '/item',
          query: {
            id:  id
          }
        }} ><a>{title}</a></Link></div>
        <div className="item__image"></div> 
        <div className="item__description">{description}</div>
        <div className="item__price">{formatCurrency(price)}</div>
        <div className="item__actions">
          <Link href={{
            pathname: 'update',
            query: {
              id: id
            }
          }}><a>Edit ✏️</a>
          </Link>
          <Link href="#">
            <a onClick={() => {}}>Add to cart 🛒</a>
          </Link>
          <Link href="#" >
            <a onClick={() => {}}>Add to favorite ❤️</a>
          </Link>
          <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id: id }}>
            {(deleteItem, { loading, error, called, data }) => (
              <Link href="#" >
              <a onClick={async (e) => {
                e.preventDefault();
                await deleteItem();
                Router.push({
                  pathname: '/items',
                  query: {
                    deleted: id
                  }
                });
              }}>Remove ️☠️</a>
            </Link>
          )}
          </Mutation>
        </div>
      </StyledItem>
    );
  }
}

export default Item;