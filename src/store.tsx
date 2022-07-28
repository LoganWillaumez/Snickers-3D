import { proxy } from 'valtio';

interface Store {
  current: any;
  items: {
    Obj01: string;
    Obj02: string;
    Obj03: string;
    Obj04: string;
  };
  favourites: any;
  changeCurrent(value: string | null);
  changeItemsColor(obj: string | Object, value?: string | undefined);
  resetState();
  randomColor();
  addFavourites(fav: object);
  resetFavourites();
}

const initialValue = {
  current: null,
  items: {
    Obj01: '#2F2C2F',
    Obj02: '#992638',
    Obj03: '#211E20',
    Obj04: '#C7C9CB',
  },
  favourites: [],
};

const store: Store = proxy({
  ...initialValue,
  changeCurrent: (value: string | null) => {
    store.current = value;
  },
  changeItemsColor: (obj: string | Object, value?: string | undefined) => {
    if (typeof obj === 'string') {
      store.items[obj] = value;
    } else {
      for (const key in obj) {
        store.items[key] = obj[key];
      }
    }
  },
  addFavourites: (fav: any) => {
    // if (fav !== []) {
    store.favourites = fav;
    // }
  },
  resetState: () => {
    store.current = initialValue.current;
    store.items = { ...initialValue.items };
  },
  randomColor: () => {
    console.log('click');
    for (const key in store.items) {
      const n = (Math.random() * 0xfffff * 1000000).toString(16);
      const randomColor = '#' + n.slice(0, 6);
      store.items[key] = randomColor;
    }
  },
  resetFavourites: () => {
    store.favourites = [];
  },
});
export default store;
