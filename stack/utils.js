import {
  isDice,
  isWildcardDice
} from './checks';

import {
  getType
} from './getters';

import {
  createDiceResult,
  createAddOperation,
  createLeftParentheses,
  createRightParentheses,
  createEvalFunction
} from './creators';

import {
  doRolls
} from '../utils/rolls';

/**
 * Transform an stack item to a string.
 * @param {}
 */
export const stackItemToString = ({ value, dices, faces }) => (value || `${dices}d${faces}`)

/**
 * Transform the stack to a string.
 * @param {FormulaStack} formulaStack Stack to be transformed into a string.
 */
export const stackToString = formulaStack =>
  formulaStack.reduce((accumulator, item) => {
    return accumulator + stackItemToString(item);
  }, "");



const mapRollsToDiceResult = (value, index) => {
  const diceResult = createDiceResult(value);
  return index >= 1 ? [createAddOperation(), diceResult] : diceResult;
};

/**
 * Returns a new array with every dice replaced with dices results between parentheses.
 * @param {FormulaStack} formulaStack Stack to be transformed.
 * @returns {FormulaStack} Stack with dices replaced.
 */
export const replaceDices = formulaStack => {
  return formulaStack.map(item => {
    const type = getType(item);
    if (isDice(type) || isWildcardDice(type)) {
      const { faces, dices } = item;
      const rolls = doRolls(dices, faces).map(mapRollsToDiceResult).flat();
      return [createLeftParentheses(), ...rolls, createRightParentheses()];
    }
    return item;
  }).flat();
};

/**
* Computes the result of the stack.
* @param {FormulaStack} formulaStack Stack to be evaluated.
* @returns { { result: number, parsedFormula: string, error?: any } } Stack evaluation result.
*/
export const computeResult = formulaStack => {
  try {
    const parsedFormulaStack = replaceDices(formulaStack);
    const result = createEvalFunction(stackToString(parsedFormulaStack))() || 0;
    return {
      result,
      formulaStack,
      parsedFormulaStack,
      error: null
    };
  } catch (error) {
    return {
      result: 0,
      formulaStack,
      parsedFormulaStack: [],
      error
    };
  }
};