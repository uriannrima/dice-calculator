import React from 'react';

import { Text } from '../../../components';

import { isDice, isDiceResult, isConstant, isWildcardDice, getType, stackItemToString } from '../../../stack';

function getTextColorByType(type) {
  if (isDice(type) || isWildcardDice(type) || isDiceResult(type)) {
    return 'warning';
  } else if (isConstant(type)) {
    return 'danger';
  }

  return '';
}

export default function StackTextItem({ item }) {
  const color = getTextColorByType(getType(item));
  return (
    <Text color={color}>{stackItemToString(item)}</Text>
  );
}