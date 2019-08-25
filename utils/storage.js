import localforage from 'localforage';

export default {
  set(name, value) {
    return localforage.setItem(name, value);
  },
  get(name) {
    return localforage.getItem(name);
  }
}