import { getTop, getType, getTopType } from './getters';

import {
  isLeftParentheses,
  isConstant,
  isDice,
  isRightParentheses,
  isWildcardDice,
  shouldAllowPush
} from './checks';

import {
  pushConstantToStack,
  pushDiceToStack,
  pushOperationToStack,
  pushToStack,
  pushPlusThenDiceToStack,
  replaceAtTop,
  replaceConstantAtTop,
  replaceWildcardAtTop,
  pushPlusThenConstantToStack,
  popStack,
  pushDiceToStack
} from './operations';

import {
  createMultiplyOperation,
  createAddOperation,
  createConstant,
  createDice,
  createWildcardDice
} from './creators';

/**
 * Handle what happens to the stack when a dice is being added after another dice.
 * @param {FormulaStack} formulaStack Stack to be transformed.
 * @param {DiceItem} dice Dice to be added.
 * @returns {FormulaStack} Transformed 
 */
export const handleDiceAfterDice = (formulaStack, dice) => {
  const { faces } = dice;
  const top = getTop(formulaStack);
  if (top.faces === faces) {
    return replaceAtTop(formulaStack, createDice(faces, top.dices + 1));
  } else if (isWildcardDice(topType)) {
    return replaceWildcardAtTop(formulaStack, faces);
  } else {
    return pushPlusThenDiceToStack(formulaStack, dice);
  }
};

/**
 * Handle what happens to the stack when a dice is being added after a constant.
 * @param {FormulaStack} formulaStack Stack to be transformed.
 * @param {DiceItem} dice Dice to be added.
 * @returns {FormulaStack} Transformed 
 */
export const handleDiceAfterConstant = (formulaStack, dice) => {
  const { faces, type } = dice;
  const { value } = getTop(formulaStack);
  const create = isWildcardDice(type) ? createWildcardDice : createDice;
  return replaceAtTop(formulaStack, create(faces, parseInt(value)));
};


/**
 * Handle what happens to the stack when a left parentheses is being added.
 * @param {FormulaStack} formulaStack Stack to be transformed.
 * @param {StackItem} parentheses Dice to be added.
 * @returns {FormulaStack} Transformed 
 */
export const handleLeftParentheses = (formulaStack, parentheses) => {
  const top = getTop(formulaStack);
  const topType = getType(top);
  if (isConstant(topType) || isDice(topType)) {
    return pushToStack(
      pushOperationToStack(formulaStack, createMultiplyOperation()),
      parentheses
    );
  } else if (isRightParentheses(top)) {
    return pushToStack(
      pushOperationToStack(formulaStack, createAddOperation()),
      parentheses
    );
  }

  return pushToStack(formulaStack, parentheses);
};

/**
 * Handle what happens to the stack when a right parentheses is being added.
 * @param {FormulaStack} formulaStack Stack to be transformed.
 * @param {StackItem} parentheses Dice to be added.
 * @returns {FormulaStack} Transformed 
 */
export const handleRightParentheses = (formulaStack, parentheses) => {
  const top = getTop(formulaStack);
  if (isLeftParentheses(top)) {
    return pushToStack(
      pushToStack(formulaStack, createConstant(0)),
      parentheses
    );
  }
  return pushToStack(formulaStack, parentheses);
};

export const handlers = {
  /**
   * Handler for dice buttons.
   * @param {FormulaStack} formulaStack Stack to be transformed.
   * @param {DiceItem} dice Item to be used as reference for the transformation.
   * @returns {FormulaStack} Transformed 
   */
  dice: function (formulaStack, dice) {
    const top = getTop(formulaStack);
    const topType = getType(top);
    if (shouldAllowPush(top)) {
      return pushDiceToStack(formulaStack, dice);
    } else if (isDice(topType)) {
      return handleDiceAfterDice(formulaStack, dice);
    } else if (isConstant(topType)) {
      return handleDiceAfterConstant(formulaStack, dice);
    } else {
      return pushPlusThenDiceToStack(formulaStack, dice);
    }
  },

  wildcardDice: function (formulaStack, wildcardDice) {
    return handlers.dice(formulaStack, wildcardDice);
  },

  /**
   * Handler for constant buttons.
   * @param {FormulaStack} formulaStack Stack to be transformed.
   * @param {StackItem} constant Item to be used as reference for the transformation.
   * @returns {FormulaStack} Transformed 
   */
  constant: function (formulaStack, constant) {
    const top = getTop(formulaStack);
    const topType = getType(top);
    if (shouldAllowPush(top)) {
      return pushConstantToStack(formulaStack, constant);
    } else if (isConstant(topType)) {
      return replaceConstantAtTop(formulaStack, constant);
    } else if (isWildcardDice(topType)) {
      return replaceWildcardAtTop(formulaStack, constant.value);
    } else {
      return pushPlusThenConstantToStack(formulaStack, constant);
    }
  },

  /**
   * Handler for operation buttons.
   * @param {FormulaStack} formulaStack Stack to be transformed.
   * @param {StackItem} operation Item to be used as reference for the transformation.
   * @returns {FormulaStack} Transformed 
   */
  operation: function (formulaStack, operation) {
    const topType = getTopType(formulaStack);
    if (topType) {
      return pushOperationToStack(formulaStack, operation);
    }
    return formulaStack;
  },

  /**
   * Handler for parentheses buttons.
   * @param {FormulaStack} formulaStack Stack to be transformed.
   * @param {StackItem} parentheses Item to be used as reference for the transformation.
   * @returns {FormulaStack} Transformed 
   */
  parentheses: function (formulaStack, parentheses) {
    if (isLeftParentheses(parentheses)) {
      return handleLeftParentheses(formulaStack, parentheses);
    } else if (isRightParentheses(parentheses)) {
      return handleRightParentheses(formulaStack, parentheses);
    }
  },

  /**
   * Handler backspace transformation.
   * @param {FormulaStack} formulaStack Stack to be transformed.
   * @returns {FormulaStack} Transformed 
   */
  backspace: function (formulaStack) {
    const top = getTop(formulaStack);
    const type = getType(top);
    if (isConstant(type)) {
      const { value } = top;
      const newValue = value.slice(0, value.length - 1);
      if (newValue) {
        return replaceAtTop(formulaStack, {
          ...top,
          value: newValue
        });
      }
    } else if (isDice(type) || isWildcardDice(type)) {
      const { dices } = top;
      return replaceAtTop(formulaStack, createConstant(dices))
    }
    return popStack(formulaStack);
  }
};