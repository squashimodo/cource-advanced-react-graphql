import React from 'react';
import PromptSignin from '../components/PromptSignin';
import Permissions from '../components/Permissions';

const PermissionsPage = () => (
  <div>
    <PromptSignin>{() => <Permissions />}</PromptSignin>
  </div>
);

export default PermissionsPage;
