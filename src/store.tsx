import { proxy } from 'valtio';

interface Store {
  resetState();
  current: any;
  items: {
    Obj01: string;
    Obj02: string;
    Obj03: string;
    Obj04: string;
  };
  changeCurrent(value: string | null);
  changeItemsColor(obj: string, value: string);
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
});

export default store;
