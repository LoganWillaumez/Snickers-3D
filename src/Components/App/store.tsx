import { proxy } from 'valtio';

interface Store {
  current: any;
  items: {
    [key: string]: any;
  };
  favourites: any;
  changeStore(key: keyof Store, value: any, nested?: string | undefined): void;
  resetState(): void;
  randomColor(): void;
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
  /**
   * Change the value of the store. Nested parameter is optionnal.
   * @param {keyof Store} key
   * @param {any} value
   * @param {string | undefined} nested
   */
  changeStore: (key, value, nested) => {
    if (nested) {
      store[key][nested] = value;
    } else {
      store[key] = value;
    }
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
