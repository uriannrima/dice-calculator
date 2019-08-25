import React, { useState, useEffect } from 'react';

import { stackToString, computeResult } from '../../stack';

const handleResult = () => {
    const { result, error, parsedFormula } = computeResult(formulaStack);
  }

export default function useFormula() {
  const [formulaStack, setFormulaStack] = React.useState([]);
  const [formula, setFormula] = React.useState('');

  useEffect(() => {
    setFormula(stackToString(formulaStack));
  }, [formulaStack]);

  const clearFormulaStack = () => {
    setFormulaStack([]);
  };

  return {
    formulaStack,
    setFormulaStack,
    formula,
    clearFormulaStack
  }
}