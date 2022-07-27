import { proxy } from 'valtio';

interface Store {
  current: any;
  items: {
    obj1: string;
    obj2: string;
    obj3: string;
    obj4: string;
  };
  changeCurrent(name: any);
  changeItemsColor(obj: string, value: string);
}

const store: Store = proxy({
  current: null,
  items: {
    obj1: '#2F2C2F',
    obj2: '#992638',
    obj3: '#211E20',
    obj4: '#C7C9CB',
  },
  changeCurrent: (value) => {
    store.current = value;
  },
  changeItemsColor: (obj: string, value: string) => {
    store.items[obj] = value;
  },
});

export default store;
