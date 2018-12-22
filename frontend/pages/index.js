import React from 'react';
import Items from '../components/Items';

const Home = props => (
  <div>
    <h1>Welcome to this site</h1>
    <Items page={parseFloat(props.query.page)} />
  </div>
  );

export default Home;
