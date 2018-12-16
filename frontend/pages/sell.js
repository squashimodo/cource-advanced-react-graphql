import React, { Component } from 'react';
import CreateItem from '../components/CreateItem';
import PromptSignin from '../components/PromptSignin';

class Sell extends Component {
  render() {
    return (
      <div>
        <PromptSignin>
          <h2>Sell</h2>
          <CreateItem />
        </PromptSignin>
      </div>
    );
  }
}

export default Sell;