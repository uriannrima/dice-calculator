import React from 'react';

import { Button, Icon } from '../';

export default function DiceButton({ onClick, color = 'success', icon, name }) {
  return (
    <Button color={color} onClick={onClick} disabled={!onClick}>
      <Icon icon={icon} name={name} />
    </Button>
  );
}