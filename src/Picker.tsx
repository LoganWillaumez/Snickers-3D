import React from 'react';
import { proxy, useSnapshot } from 'valtio';
import store from './store';
import { HexColorPicker } from 'react-colorful';
import './Picker.css';

export const Picker = () => {
  const snap = useSnapshot(store);
  return (
    <div className='picker'>
      <h2 className='picker__name'>
        {snap.current !== null ? snap.current : 'Select a part to color'}
      </h2>
      <HexColorPicker className='picker__hex' />
    </div>
  );
};
