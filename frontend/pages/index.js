import React from 'react';
import Items from '../components/Items';

const Home = props => (
  <div>
    <h1>Webshop</h1>
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;
