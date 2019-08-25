import { getType, getTop } from './getters';

/**
 * Type checker creator.
 * @param {string} typeToCheck Type to be checked.
 */
const isCheck = typeToCheck => type => type === typeToCheck;

/** Operation type checker. */
export const isOperation = isCheck("operation");
/** Constant type checker. */
export const isConstant = isCheck("constant");
/** Dice type checker. */
export const isDice = isCheck("dice");
/** Wildcard Dice type checker. */
export const isWildcardDice = isCheck("wildcardDice");
/** Dice result type checker. */
export const isDiceResult = isCheck("diceResult");
/** Backspace type checker. */
export const isBackspace = isCheck("backspace");
/** Parentheses type checker. */
export const isParentheses = isCheck("parentheses");
/** Result type checker. */
export const isResult = isCheck("result");

/**
 * Side parentheses checker creator.
 * @param {'left'|'right'} checkSide Side to be checked.
 */
const isSideParentheses = checkSide => (parentheses) =>
  isParentheses(getType(parentheses)) && parentheses.side === checkSide;

/** Left parentheses checker. */
export const isLeftParentheses = isSideParentheses("left");

/** Right parentheses checker. */
export const isRightParentheses = isSideParentheses("right");

/**
 * Check if the top item is:
 * - Absent (no type).
 * - An operation.
 * - A Left parentheses.
 * If it is, just push the element to the stack.
 * @param {StackItem} top Element to be checked.
 */
export const shouldAllowPush = top =>
  !getType(top) || isOperation(getType(top)) || isLeftParentheses(top);
