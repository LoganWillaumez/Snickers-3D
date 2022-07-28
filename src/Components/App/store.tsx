import { proxy } from 'valtio';

interface Store {
  current: any;
  items: {
    [key: string]: any;
  };
  favourites: any;
  changeCurrent(value: string | null): void;
  changeItemsColor(obj: string | object, value?: string | undefined): void;
  resetState(): void;
  randomColor(): void;
  addFavourites(fav: object): void;
  resetFavourites(): void;
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
  changeCurrent: (value) => {
    store.current = value;
  },
  changeItemsColor: (obj, value) => {
    if (typeof obj === 'string') {
      store.items[obj] = value;
    } else {
      for (const key in obj) {
        store.items[key] = obj[key]; //! Chec why type problem
      }
    }
  },
  addFavourites: (fav: any) => {
    store.favourites = fav;
  },
  resetState: () => {
    store.current = initialValue.current;
    store.items = { ...initialValue.items };
  },
  randomColor: () => {
    for (const key in store.items) {
      const n = (Math.random() * 0xfffff * 1000000).toString(16);
      const randomColor = '#' + n.slice(0, 6);
      store.items[key as keyof Store['items']] = randomColor;
    }
  },
  resetFavourites: () => {
    store.favourites = [];
  },
});
export default store;
