import React from 'react';

import DiceCalculatorField from './DiceCalculatorField';

export default function ResultField({ parsedFormula, result }){
  const value = parsedFormula && parsedFormula.length ? parsedFormula + " = " + result : result;
  return (
    <DiceCalculatorField
      type="text"
      label="Result"
      value={value}
      disabled
      className="ResultField"
    />
  );
};
