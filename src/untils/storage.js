import localforage from "localforage";
class Storage {
  static set(key, value) {
    return localforage.setItem(key, value);
  }
  static get(key) {
    return localforage.getItem(key);
  }
  static remove(key) {
    return localforage.removeItem(key);
  }
}

export default Storage;
