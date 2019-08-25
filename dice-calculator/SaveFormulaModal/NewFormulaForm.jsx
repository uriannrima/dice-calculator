import React, { useState } from 'react';

import { FormulaField, DiceCalculatorField } from '../components/fields';

import { StackTransformer, Button, Icon } from '../../components';

export default function NewFormulaForm({
  formula,
  onSaveFormula = () => { }
}) {
  const [name, setName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (name && name.trim().length) {
      onSaveFormula({
        formula,
        name
      });
      setName('');
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <StackTransformer stack={formula}>{
        (parsedFormula) => <FormulaField formula={parsedFormula} />
      }</StackTransformer>
      <DiceCalculatorField
        label="Formula Name"
        value={name}
        onInput={({ target: { value } }) => setName(value)}
      />
      <Button expand="full" type="submit">
        <Icon name="save" />
      </Button>
    </form>
  );
}