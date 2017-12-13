import store from 'store';

const NAME_SPACE = 'com.adsbold.';

export const get = (key) => {
  const realKey = NAME_SPACE + key;

  return store.get(realKey);
};

export const set = (key, data) => {
  const realKey = NAME_SPACE + key;

  return store.set(realKey, data);
};

export const clear = (key) => {
  const realKey = NAME_SPACE + key;

  return store.clear(realKey);
};

export const clearAll = () => {
  store.clearAll();
};
