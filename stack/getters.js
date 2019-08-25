import { getTop, getType } from './getters';

/**
 * Get type from the object passed, or return empty.
 * @param {StackItem} element Element to get type from.
 * @returns {string} Type of the object.
 */
export const getType = ({ getType, type }) => getType ? getType() : type ? type : '';

/**
 * Get type from the top element from the stack.
 * @param {FormulaStack} formulaStack Stack to get the top element from.
 * @returns {string} Type of the top item of the stack.
 */
export const getTopType = formulaStack => getType(getTop(formulaStack)) || "";

/**
 * Get top element from the stack or an empty object.
 * @param {FormulaStack} formulaStack Stack to get the element from.
 * @returns {StackItem} Top element from the stack.
 */
export const getTop = formulaStack => formulaStack[formulaStack.length - 1] || { type: '' };