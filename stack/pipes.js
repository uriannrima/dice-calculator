export function pipe(...compositions) {
  return function (toCompose = {}) {
    return compositions.reduce((current, apply) => {
      return {
        ...current,
        ...apply(toCompose)
      };
    }, toCompose);
  }
}

export function withProperty(propertyName, propertyValue) {
  return function () {
    return {
      [propertyName]: propertyValue
    }
  }
}

export const withHotkey = (hotkey) => pipe(
  withProperty('hotkey', hotkey)
);

export const withType = (type) => pipe(
  withProperty('type', type)
)

export const withDiceProperties = ({ faces, dices }) => pipe(
  withProperty('dices', dices),
  withProperty('faces', faces),
  withProperty('label', `d${faces}`)
);

export const asDicePipe = ({ faces, dices }) => pipe(
  withDiceProperties({ faces, dices }),
  withType('dice')
);

export const asWildcardDicePipe = ({ faces, dices }) => pipe(
  asDicePipe({ faces, dices }),
  withHotkey('d'),
  withType('wildcardDice')
)

export const asDiceResultPipe = ({ value }) => pipe(
  withProperty('value', value),
  withType('diceResult')
)

export const asConstantPipe = ({ value }) => pipe(
  withProperty('value', value.toString()),
  withHotkey(value),
  withType('constant')
);

export const asCommandPipe = ({ value, label }) => pipe(
  withProperty('value', value),
  withProperty('label', label),
  withType('command')
);

export const asOperationPipe = ({ value, label }) => pipe(
  withProperty('value', value),
  withHotkey(value),
  withProperty('label', label || value),
  withType('operation')
);

export const asParentheses = ({ value, side }) => pipe(
  withProperty('label', value),
  withProperty('value', value),
  withHotkey(value),
  withProperty('side', side),
  withType('parentheses')
)
