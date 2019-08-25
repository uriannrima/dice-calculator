import React, { useState } from 'react';

import { SavedItemsContainer } from './'

export default function SavedFormulasContainer({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState(null);

  function openModal(newItem) {
    setIsModalOpen(true);
    setNewItem(newItem);
  }

  function closeModal() {
    setIsModalOpen(false);
    setNewItem(null);
  }

  function saveFormula(saveItem) {
    return function (formulaToSave) {
      saveItem(formulaToSave);
      closeModal();
    }
  }

  function removeFormula(removeItem) {
    return function (formulaToRemove) {
      removeItem(formulaToRemove);
    }
  }

  return (
    <SavedItemsContainer>
      {({ savedItems: savedFormulas, saveItem, removeItem }) => (children({
        savedFormulas,
        saveFormula: saveFormula(saveItem),
        removeFormula: removeFormula(removeItem),
        isModalOpen,
        openModal,
        closeModal,
        newItem,
      }))}
    </SavedItemsContainer>
  );
}