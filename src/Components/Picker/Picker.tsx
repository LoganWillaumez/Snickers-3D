import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import store from '../App/store';
import { HexColorPicker } from 'react-colorful';
import './Picker.css';

export const Picker = ({
  fav,
  setFav,
}: {
  fav: [{ [key: string]: any }] | never[];
  setFav: Function;
}) => {
  const { current, items, resetState, randomColor, changeStore } =
    useSnapshot(store);
  useEffect(() => {
    changeStore('favourites', fav);
  }, [fav]);
  return (
    <div className='picker'>
      <h2 className='picker__name'>
        {current !== null ? current : 'Select to color'}
      </h2>
      <HexColorPicker
        className='picker__hex'
        color={items[current]}
        onChange={(color) => {
          changeStore('items', color, current);
        }}
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
