import React from 'react';
import UpdateItem from '../components/UpdateItem';

const UpdateItemPage = ({ query: { id } }) => (
  <div>
    <UpdateItem id={id} />
  </div>
);

export default UpdateItemPage;
