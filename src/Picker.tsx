import React, { useEffect } from 'react';
import { proxy, useSnapshot } from 'valtio';
import store from './store';
import { HexColorPicker } from 'react-colorful';
import './Picker.css';
import { useLocalstorageState } from 'rooks';

export const Picker = ({
  fav,
  setFav,
}: {
  fav: { [key: string]: any };
  setFav: Function;
}) => {
  const {
    current,
    items,
    favourites,
    changeItemsColor,
    resetState,
    randomColor,
    addFavourites,
  } = useSnapshot(store);
  useEffect(() => {
    if (fav.length !== 0) addFavourites(fav);
  }, [fav]);
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
        <button
          type='button'
          className='btn'
          onClick={() => {
            // const nameFav = `fav0${favourites.length}`;
            // const newObj = {};
            // newObj[nameFav] = items;
            const result = Object.entries(items).map(([key, value]) => ({
              [key]: value,
            }));
            const final: any = [...fav, { ...items }];
            setFav(final);
          }}
        >
          <i className='fa-solid fa-bookmark'> +</i>
        </button>
      </div>
    </div>
  );
};
