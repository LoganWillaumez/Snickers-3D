import React from 'react';
import { proxy, useSnapshot } from 'valtio';
import store from './store';
import { HexColorPicker } from 'react-colorful';
import './Picker.css';

export const Picker = () => {
  const { current, items, changeItemsColor, resetState, randomColor } =
    useSnapshot(store);
  return (
    <div className='picker'>
      <h2 className='picker__name'>
        {current !== null ? current : 'Select to color'}
      </h2>
      <HexColorPicker
        className='picker__hex'
        color={items[current]}
        onChange={(color) => changeItemsColor(current, color)}
      />
      <div className='picker__buttons'>
        <button type='button' className='btn' onClick={() => resetState()}>
          Reset
        </button>
        <button type='button' className='btn' onClick={() => randomColor()}>
          Random
        </button>
        <button type='button' className='btn' onClick={() => randomColor()}>
          Fav
        </button>
      </div>
    </div>
  );
};
