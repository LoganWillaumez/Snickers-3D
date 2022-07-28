import { useState } from 'react';
import { useSnapshot } from 'valtio';
import './Favourites.css';
import store from '../../Components/App/store';
export const Favourites = ({ setFav }: { setFav: Function }) => {
  const { favourites, resetFavourites, changeItemsColor } = useSnapshot(store);
  const [click, setClick] = useState(false);
  const toggleClick = () => {
    setClick(!click);
  };
  return (
    <div className={`favourites ${click && 'favourites--active'}`}>
      <div className='favourites__containter'>
        <div className='favourites__colors'>
          {favourites.length !== 0 ? (
            favourites.map(
              (
                favourite: {
                  Obj01: string;
                  Obj02: string;
                  Obj03: string;
                  Obj04: string;
                },
                i: number
              ) => {
                return (
                  <button
                    className='btn--disable'
                    key={favourite.Obj01 + i}
                    onClick={() => {
                      changeItemsColor(favourite);
                    }}
                  >
                    <div
                      className='favourites__gradient'
                      style={{
                        backgroundImage: `linear-gradient(43deg, ${favourite.Obj01} 0%, ${favourite.Obj04} 50%, ${favourite.Obj02} 100%`,
                      }}
                    ></div>
                  </button>
                );
              }
            )
          ) : (
            <p className='favourites__text'>Favourites</p>
          )}
        </div>
      </div>
      <button
        type='button'
        className='btn btn--arrow btn--disable'
        onClick={() => toggleClick()}
      >
        <i className='favourites__icon--arrow fa-solid fa-caret-left'></i>
      </button>
      <button
        type='button'
        className='btn btn--cross btn--disable'
        onClick={() => {
          setFav([]);
          resetFavourites();
        }}
      >
        <i className='favourites__icon--cross fa-solid fa-x'></i>
      </button>
    </div>
  );
};
