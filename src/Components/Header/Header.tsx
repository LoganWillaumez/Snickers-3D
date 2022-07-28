import { Html } from '@react-three/drei';

import './Header.css';

export const Header = () => {
  return (
    <Html wrapperClass='header' as='div' prepend={true} zIndexRange={[100, 0]}>
      <div className='header__container'>
        <h1 className='header__title'>Customise your Sneakers !!</h1>
        <img className='header__logo' src='/nike-logo.png' alt='' />
      </div>
    </Html>
  );
};
