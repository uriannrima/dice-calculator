// /**
//  * A stack item element.
//  * @typedef {{ getType: () => string, value?: any }} StackItem<T>
//  * A dice element.
//  * @typedef {{ faces: number, dices: number } & StackItem} DiceItem
//  * A stack of typed objects.
//  * @typedef {Array.<StackItem>} FormulaStack
//  */

// export const createWithPrototype = prototype => ownProperties =>
//   Object.assign(Object.create(prototype), ownProperties);

// /**
//  * Return a object with a type.
//  * @param {string} _type Type to be used.
//  */
// export const withType = (_type) => ({
//   get type() {
//     return _type;
//   },
//   getType() {
//     return _type;
//   }
// });

// /**
//  * Return a object definition with a prototype with type.
//  * @param {string} _type Type of the object.
//  */
// export const createWithType = _type => ownProperties => createWithPrototype(withType(_type))(ownProperties);

// /**
//  * Create a dice with (dices)d(faces).
//  * @param {number} faces Number of faces.
//  * @param {number} dices Number of dices.
//  */
// export const createDice = (faces = 2, dices = 1) => createWithType('dice')({
//   label: `d${faces}`,
//   faces,
//   dices
// });

// export const createWildcardDice = (faces = 'X', dices = 1) =>
//   createWithPrototype(createDice(faces, dices))
//     ({ isWildcard: true });

// /**
//  * Create a dice result with a defined value.
//  * @param {number} value Dice result.
//  */
// export const createDiceResult = (value) => createWithType('dice-result')({
//   value
// });

// /**
//  * Create a object with constant type.
//  * @param {number} value Constant value.
//  */
// export const createConstant = (value = 1) => createWithType('constant')({
//   value: value.toString()
// });

// /**
//  * Create a object with command type.
//  * @param {string} value Command value.
//  * @param {string} label Command label.
//  */
// export const createCommand = (value, label) => createWithType('command')({
//   value,
//   label
// });

// /**
//  * Create a object with parentheses type.
//  * @param {'('|')'} value Parentheses value.
//  * @param {'left'|'right'} side Parentheses side.
//  */
// export const createParentheses = (value, side) => createWithType('parentheses')({
//   label: value,
//   value,
//   side
// });

// /**
//  * Create a object with operation type.
//  * @param {string} value Operation value.
//  * @param {string=} label Operation label.
//  */
// export const createOperation = (value, label) => createWithType('operation')({
//   value,
//   label: label || value
// });

// /** Left parentheses creator. */
// export const createLeftParentheses = () => createParentheses("(", "left");

// /** Right parentheses creator. */
// export const createRightParentheses = () => createParentheses(")", "right");

// /** 
//  * Add operation creator.
//  * @returns {StackItem} Add operation.
// */
// export const createAddOperation = () => createOperation("+", "\u002B");
// /** 
//  * Minus operation creator.
//  * @returns {StackItem} Minus operation.
//  */
// export const createMinusOperation = () => createOperation("-", "\u2212");

// /** 
//  * Multiply operation creator.
//  * @returns {StackItem} Multiply operation.
//  */
// export const createMultiplyOperation = () => createOperation("*", "\u00D7");

// /** 
//  * Divide operation creator.
//  * @returns {StackItem} Divide operation.
//  */
// export const createDivideOperation = () => createOperation("/", "\u00F7");

/**
 * Creates an function that returns a result to the formula stack.
 * @param {string} expression Expression to be evaluated.
 */
export const createEvalFunction = expression =>
  new Function(`return ${expression};`);

import * as pipes from './pipes';

export function createWithType(type) {
  return function (props) {
    return pipes.pipe(
      pipes.withType(type)
    )(props);
  }
}

export function createDice(faces = 2, dices = 1) {
  return pipes.asDicePipe({ faces, dices })({});
}

export function createWildcardDice(faces = 'X', dices = 1) {
  return pipes.asWildcardDicePipe({ faces, dices })({});
}

export function createDiceResult(value) {
  return pipes.asDiceResultPipe({ value })({})
}

export function createConstant(value) {
  return pipes.asConstantPipe({ value })({})
}

export function createCommand(value, label) {
  return pipes.asCommandPipe({ value, label })({})
}

export function createOperation(value, label) {
  return pipes.asOperationPipe({ value, label })({})
}

export function createLeftParentheses() {
  return pipes.asParentheses({ side: 'left', value: '(' })({})
}

export function createRightParentheses() {
  return pipes.asParentheses({ side: 'right', value: ')' })({})
}

export function createAddOperation() {
  return pipes.asOperationPipe({ value: '+', label: '\u002B' })();
}
export function createMinusOperation() {
  return pipes.asOperationPipe({ value: '-', label: '\u2212' })();
}
export function createMultiplyOperation() {
  return pipes.asOperationPipe({ value: '*', label: '\u00D7' })();
}
export function createDivideOperation() {
  return pipes.asOperationPipe({ value: '/', label: '\u00F7' })();
}