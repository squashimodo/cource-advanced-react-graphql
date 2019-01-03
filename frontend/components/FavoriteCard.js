import React from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Image = styled.img`
  flex: 0 0 200px;
  height: 200px;
  width: 200px;
  object-fit: cover;
  margin-right: 24px;
  display: block;
`;

const FavoriteData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    margin-top: 0;
  }
`;

const FavoriteCard = ({
  item: { id, title, image, description },
  moveToCart,
}) => (
  <Wrapper key={id}>
    <Image alt={title} src={image} />
    <FavoriteData>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <SickButton onClick={() => moveToCart(id)}>Move to cart</SickButton>
      </div>
    </FavoriteData>
  </Wrapper>
);

export default FavoriteCard;
