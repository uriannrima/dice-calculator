import * as stack from '../stack';

export default {
  rows: [
    {
      columns: [
        stack.createDice(100),
        stack.createWildcardDice(),
      ]
    },
    {
      columns: [
        stack.createDice(10),
        stack.createDice(12),
        stack.createDice(20),
        stack.pipe(
          stack.withType('backspace'),
          stack.withProperty('label', "\u232b"),
          stack.withHotkey('Backspace')
        )({}),
      ]
    },
    {
      columns: [
        stack.createDice(4),
        stack.createDice(6),
        stack.createDice(8),
        stack.createMultiplyOperation()
      ]
    },
    {
      columns: [
        stack.createConstant(7),
        stack.createConstant(8),
        stack.createConstant(9),
        stack.createDivideOperation()
      ]
    },
    {
      columns: [
        stack.createConstant(4),
        stack.createConstant(5),
        stack.createConstant(6),
        stack.createAddOperation()
      ]
    },
    {
      columns: [
        stack.createConstant(1),
        stack.createConstant(2),
        stack.createConstant(3),
        stack.createMinusOperation()
      ]
    },
    {
      columns: [
        stack.createLeftParentheses(),
        stack.createConstant(0),
        stack.createRightParentheses(),
        stack.pipe(
          stack.withType('result'),
          stack.withProperty('label', "Roll"),
          stack.withProperty('icon', "ra ra-dice-three"),
          stack.withHotkey('Enter')
        )({})
      ]
    }
  ]
};