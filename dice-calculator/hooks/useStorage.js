import React, { useEffect } from 'react';

export default function useStorage({
  storage = {
    set() { },
    get() { }
  },
  storageName = 'default-storage',
  watched,
  onLoad = () => { }
}) {

  useEffect(() => {
    storage.set(storageName, watched);
  }, [watched]);

  useEffect(() => {
    async function loadFromStore() {
      const fromStore = await storage.get(storageName);
      if (fromStore) {
        onLoad(fromStore);
      }
    }
    loadFromStore();
  }, []);

  return {
    stored: watched
  }
}