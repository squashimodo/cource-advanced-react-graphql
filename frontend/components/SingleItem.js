import React, { Component } from 'react';

import styled from 'styled-components';

import Head from 'next/head';
const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow ${({theme}) => theme.bs};

  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`

class SingleItem extends Component {
  render() {
    const { item: {
      id,
      price,
      title,
      description,
      largeImage
    } } = this.props;
    return (
      <SingleItemStyles>
        <Head>
          <title>Stuff! - {title}</title>
        </Head>
        <img src={largeImage} alt={`Product picture of ${title}`}/>
        <div className="details">
          <h2>{title} - {price} - {id}</h2>
          <h3>{description}</h3>
        </div>
      </SingleItemStyles>
    );
  }
}

export default SingleItem;