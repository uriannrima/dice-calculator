import React from 'react';

export default function DiceCalculatorField({
  tag: Tag,
  label,
  color,
  ...rest
}) {
  return (
    <ion-item lines="full" color={color}>
      <ion-label position="floating">{label}</ion-label>
      <Tag {...rest} />
    </ion-item>
  );
};

DiceCalculatorField.defaultProps = {
  tag: "ion-input"
};