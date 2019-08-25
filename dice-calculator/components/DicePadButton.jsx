import React from 'react';

import { Button } from '../../components';
import * as stack from '../../stack';

function getDicePadVariant(button) {
  const { type, disabled } = button;
  if (stack.isWildcardDice(type)) {
    return "tertiary";
  } else if (stack.isDice(type)) {
    return "secondary";
  } else if (stack.isBackspace(type)) {
    return "danger";
  } else if (stack.isOperation(type)) {
    return "warning";
  } else if (stack.isParentheses(type)) {
    return "dark";
  } else if (stack.isResult(type)) {
    return "success";
  }
};

export default function DicePadButton({ button, onClick, onLongClick }) {
  const { label, value, disabled, icon } = button;
  const onPadButtonClick = () => onClick(button);
  const onPadButtonLongClick = () => onLongClick(button);
  const variant = getDicePadVariant(button);

  let content = label || value;
  if (icon) {
    content = <i className={icon}></i>
  }

  return (
    <Button
      expand="full"
      onClick={onPadButtonClick}
      onLongClick={onPadButtonLongClick}
      color={variant}
      disabled={disabled}
    >
      {content}
    </Button>
  );
};