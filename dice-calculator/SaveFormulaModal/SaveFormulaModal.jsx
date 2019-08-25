import React from 'react';
import { Modal } from '../../components/Modal';
import { FormulaField } from '../components/fields';

import NewFormulaForm from './NewFormulaForm';

export default function SaveFormulaModal({
  isOpen = false,
  formula = [],
  onSaveFormula = () => { },
  ...rest
}) {

  return (
    <Modal isOpen={isOpen} {...rest}>
      <NewFormulaForm formula={formula} onSaveFormula={onSaveFormula} />
    </Modal>
  );
}