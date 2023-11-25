import { DefaultException } from '../exceptions/default.exception';

const saveItemLocalStorage = (key: string, data: any, callback?: () => void) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    callback?.();
  } catch (error) {
    throw new DefaultException('Failed to save item in local storage');
  }
};

const getItemLocalStorage = <T>(key: string, callback?: () => void): T | undefined => {
  try {
    const dataPlain = localStorage.getItem(key);
    if (dataPlain === null) return undefined;
    const data: T = JSON.parse(dataPlain);
    callback?.();
    return data;
  } catch {
    throw new DefaultException('Failed to get item from local storage');
  }
};

const deleteItemLocalStorage = (key: string, callback?: () => undefined) => {
  localStorage.removeItem(key);
  callback?.();
};

const clearItemsLocalStorage = (callback?: () => undefined) => {
  localStorage.clear();
  callback?.();
};

export {
  saveItemLocalStorage,
  getItemLocalStorage,
  deleteItemLocalStorage,
  clearItemsLocalStorage,
};
