import React, { useState, useEffect } from 'react';

import * as stack from '../../stack';

export default function useFormulaResult(formulaStack) {
  const [formulaResult, setFormulaResult] = useState({
    result: 0,
    error: null,
    formulaStack: [],
    parsedFormulaStack: []
  });

  const computeResult = (forcedCompute) => {
    const formulaResult = stack.computeResult(forcedCompute || formulaStack);
    setFormulaResult(formulaResult)
  }

  return {
    computeResult,
    formulaResult
  }
}