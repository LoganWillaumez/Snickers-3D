import { proxy } from 'valtio';

interface Store {
  current: any;
  items: {
    Obj01: string;
    Obj02: string;
    Obj03: string;
    Obj04: string;
  };
  changeCurrent(value: string | null);
  changeItemsColor(obj: string, value: string);
  resetState();
  randomColor();
}

const initialValue = {
  current: null,
  items: {
    Obj01: '#2F2C2F',
    Obj02: '#992638',
    Obj03: '#211E20',
    Obj04: '#C7C9CB',
  },
};

const store: Store = proxy({
  ...initialValue,
  changeCurrent: (value: string | null) => {
    store.current = value;
  },
  changeItemsColor: (obj: string, value: string) => {
    store.items[obj] = value;
  },
  resetState: () => {
    store.current = initialValue.current;
    store.items = { ...initialValue.items };
  },
  randomColor: () => {
    console.log('click');
    for (const key in store.items) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      store.items[key] = `#${randomColor}`;
    }
  },
});

export default store;
