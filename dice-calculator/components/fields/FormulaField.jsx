import React from 'react';

import DiceCalculatorField from './DiceCalculatorField';

export default function FormulaField({ formula, error }) {
  return (
    <DiceCalculatorField
      type="text"
      label="Formula"
      value={formula}
      readOnly
      color={error ? 'danger' : ''}
    />
  );
};