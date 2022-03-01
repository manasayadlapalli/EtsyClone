import React from 'react';
import 'antd/dist/antd.css';
import {Avatar} from 'antd';

const favorites = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <Avatar size={64} icon='User'/>
    </div>
  );
};

export default favorites;
