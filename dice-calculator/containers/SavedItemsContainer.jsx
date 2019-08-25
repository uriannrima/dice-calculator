import React, { useState } from 'react';

import storage from '../../utils/storage';
import uuid from '../../utils/uuid';

import { useStorage } from '../hooks';

const withId = (itemToSave) => ({
  id: uuid(),
  ...itemToSave
})

export default function SavedItemsContainer({
  children,
  storageName = 'saved-items'
}) {
  const [savedItems, setSavedItems] = useState([]);

  const saveItem = (itemToSave) => {
    setSavedItems([
      withId(itemToSave),
      ...savedItems,
    ]);
  }

  const removeItem = ({ id: idToRemove }) => {
    setSavedItems(savedItems.filter(({ id }) => id !== idToRemove));
  }

  const { stored: storedSavedItems } = useStorage({
    storage,
    storageName,
    watched: savedItems,
    onLoad: setSavedItems
  });

  return children({
    savedItems: storedSavedItems,
    saveItem,
    removeItem
  });
}