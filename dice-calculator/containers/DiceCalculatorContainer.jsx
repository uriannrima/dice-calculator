import React from 'react';
import dicePadData from '../data';
import * as stack from '../../stack';
import storage from '../../utils/storage';

import { useFormula, useFormulaResult, useHistory, useStorage } from '../hooks';

export default function DiceCalculatorContainer({ children, maxHistory = 20 }) {
  const {
    formulaStack,
    setFormulaStack,
    clearFormulaStack,
    formula
  } = useFormula();

  const {
    computeResult,
    formulaResult
  } = useFormulaResult(formulaStack);

  const { history, setHistory } = useHistory({
    maxHistory,
    historyItem: formulaResult,
    shouldPush: (formulaResult) => {
      const { error } = formulaResult;
      return !error;
    }
  });

  const { stored: storedHistory } = useStorage({
    storage,
    storageName: 'history-items',
    watched: history,
    onLoad: setHistory
  });

  function processWithHandler(button) {
    const handler = stack.handlers[stack.getType(button)];
    if (handler) {
      const newFormulaStack = handler(formulaStack, button);
      if (newFormulaStack) {
        setFormulaStack(newFormulaStack);
      }
    }
  }

  function updateFormula(button) {
    if (stack.isResult(stack.getType(button))) {
      computeResult();
    } else {
      processWithHandler(button);
    }
  }

  const setFormulaAndCompute = stack => {
    setFormulaStack(stack);
    computeResult(stack);
  };

  return children({
    formula,
    updateFormula,
    clearFormula: clearFormulaStack,
    setFormulaAndCompute,
    formulaResult,
    history: storedHistory,
    dicePadData
  });
}

DiceCalculatorContainer.defaultProps = {
  tag: "div"
};
