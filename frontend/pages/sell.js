import React from 'react';
import CreateItem from '../components/CreateItem';
import PromptSignin from '../components/PromptSignin';

const Sell = () => (
  <div>
    <PromptSignin>
      {() => (
        <div>
          <h2>Sell</h2>
          <CreateItem />
        </div>
      )}
    </PromptSignin>
  </div>
);

export default Sell;
