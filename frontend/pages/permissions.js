import React from 'react';
import PromptSignin from '../components/PromptSignin';
import Permissions from '../components/Permissions';
const PermissionsPage = () => {
  return (
    <div>
      <PromptSignin>
        <Permissions />
      </PromptSignin>
    </div>
  );
};

export default PermissionsPage;
