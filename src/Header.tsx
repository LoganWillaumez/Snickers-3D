import { Html } from '@react-three/drei';
import React from 'react';

import './Header.css';

export const Header = () => {
  return (
    <Html
      wrapperClass='header'
      as='div'
      //   fullscreen
      prepend={true}
      zIndexRange={[100, 0]}
    >
      <div className='header__container'>
        <h1 className='header__title'>Customise your Sneakers !!</h1>
        <img className='header__logo' src='/1200px-Swoosh.svg.png' alt='' />
      </div>
    </Html>
  );
};
