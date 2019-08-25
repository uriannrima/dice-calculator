import { createAddOperation, createWildcardDice } from './creators';
import { type, getTop, getTopType } from './getters';
import { isOperation } from './checks';

/**
 * Creates a new array with the new item at the top of the stack.
 * @param {FormulaStack} formulaStack Stack to push the item to.
 * @param {StackItem} newItem Item to be pushed into the new stack.
 * @returns {FormulaStack} New stack with the new item at the top.
 */
export const pushToStack = (formulaStack, newItem) => [...formulaStack, newItem];

/**
 * Creates a new array with the operation at the top of the stack.
 * @param {FormulaStack} formulaStack Stack to push the operation.
 * @param {StackItem} operation Operation to be pushed into the stack.
 * @returns {FormulaStack} New stack with the operation at the top.
 */
export const pushOperationToStack = (formulaStack, operation) => {
  const topType = getTopType(formulaStack);
  const stackOperation = isOperation(topType) ? replaceAtTop : pushToStack;
  return stackOperation(formulaStack, operation);
};

/**
 * Creates a new array with the new item swapped with the top of the stack.
 * @param {FormulaStack} formulaStack Stack have its top replaced.
 * @param {StackItem} newItem Item to replace the top.
 * @returns {FormulaStack} New stack with the new item at the top.
 */
export const replaceAtTop = (formulaStack, newItem) => [
  ...formulaStack.slice(0, formulaStack.length - 1),
  newItem
];

/**
 * Create a new array with the top item removed from the stack.
 * @param {FormulaStack} formulaStack Stack to have its top item popped.
 * @returns {FormulaStack} New stack with the top item removed.
 */
export const popStack = formulaStack => [
  ...formulaStack.slice(0, formulaStack.length - 1)
];

/**
 * Create a new array with the constant swapped with the top of the stack.
 * @param {FormulaStack} formulaStack Stack to have its top replaced.
 * @param {StackItem} constant Constant to replace the top.
 * @returns {FormulaStack} New stack with the constant at the top.
 */
export const replaceConstantAtTop = (formulaStack, constant) => {
  const top = getTop(formulaStack);
  const { value } = constant;
  return replaceAtTop(formulaStack, {
    ...top,
    value: top.value + value
  });
};

/**
 * Create a new array with the constant pushed to the top of the stack.
 * @param {FormulaStack} formulaStack Stack to have the constant pushed.
 * @param {StackItem} constant Constant to be pushed into the stack.
 * @returns {FormulaStack} New stack with the constant at the top.
 */
export const pushConstantToStack = (formulaStack, { type, value }) =>
  pushToStack(formulaStack, { type, value });

/**
 * Create a new array with the dice pushed to the top of the stack.
 * @param {FormulaStack} formulaStack Stack to have the dice pushed.
 * @param {DiceItem} dice Dice to be pushed into the stack.
 * @returns {FormulaStack} New stack with the dice at the top.
 */
export const pushDiceToStack = (formulaStack, { type, faces, dices }) =>
  pushToStack(formulaStack, {
    type,
    faces,
    dices: dices || 1
  });

/**
 * Creates a new array with the dice pushed to the top of the stack after a plus operation.
 * @param {FormulaStack} formulaStack Stack to have the dice and plus operation pushed.
 * @param {DiceItem} dice Dice to be pushed into the stack.
 * @returns {FormulaStack} New stak with the dice at the top.
 */
export const pushPlusThenDiceToStack = (formulaStack, dice) =>
  pushDiceToStack(
    pushOperationToStack(formulaStack, createAddOperation()),
    dice
  );

/**
 * Creates a new array with the constant pushed to the top of the stack after a plus operation.
 * @param {FormulaStack} formulaStack Stack to have the constant and plus operation pushed.
 * @param {StackItem} constant Constant to be pushed into the stack.
 * @returns {FormulaStack} New stak with the constant at the top.
 */
export const pushPlusThenConstantToStack = (formulaStack, constant) =>
  pushConstantToStack(
    pushOperationToStack(formulaStack, createAddOperation()),
    constant
  );

/**
 * Create a new array with the dice wildcard's face swapped by the one passed.
 * @param {FormulaStack} formulaStack Stack to be transformed.
 * @param {number} faces Number of faces to be set to the wildcard.
 * @returns {FormulaStack} Transformed stack.
 */
export const replaceWildcardAtTop = (formulaStack, faces) => {
  let { faces: topFaces, dices } = getTop(formulaStack);
  if (topFaces !== 'X') {
    faces = (topFaces * 10) + parseInt(faces);
  }
  return replaceAtTop(formulaStack, createWildcardDice(faces, dices));
}