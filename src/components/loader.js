import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px' }}>
    <Oval
      height={40}
      width={40}
      color="#ffffff"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#ffffff"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>
);

export default Loader;
