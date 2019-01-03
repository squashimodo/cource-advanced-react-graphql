import React from 'react';
import Items from '../components/Items';

const HomePage = ({ query }) => (
  <div>
    <h1>Webshop</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eros felis,
      interdum non maximus eu, vehicula eget orci. Mauris et erat libero. Sed
      metus justo, commodo vitae turpis convallis, luctus convallis mi. Morbi
      commodo rutrum luctus. Interdum et malesuada fames ac ante ipsum primis in
      faucibus. Praesent a nulla sagittis turpis congue semper. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Cras nec iaculis dolor.
    </p>

    <Items page={parseFloat(query.page) || 1} />
  </div>
);

export default HomePage;
