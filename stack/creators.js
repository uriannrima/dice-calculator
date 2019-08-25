import * as pipes from './pipes';

/**
 * Creates an function that returns a result to the formula stack.
 * @param {string} expression Expression to be evaluated.
 */
export const createEvalFunction = expression =>
  new Function(`return ${expression};`);

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