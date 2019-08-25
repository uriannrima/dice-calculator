import React from 'react';

import { List, Label, StackTransformer } from '../../components';
import { DiceButton, SaveButton, TrashButton } from '../../components/Buttons';

export default function SavedFormulas({
  formulas = [],
  onReroll = () => { },
  onRemove = () => { }
}) {
  const itemRender = (savedFormula) => {
    const { name, formula } = savedFormula;
    return (
      <React.Fragment>
        <Label>
          <h3>{name}</h3>
          <StackTransformer stack={formula}>{
            (parsedFormula) => <p>{parsedFormula}</p>
          }</StackTransformer>
        </Label>
        <div slot="end">
          <TrashButton onClick={() => onRemove(savedFormula)} />
          <DiceButton onClick={() => onReroll(formula)} />
        </div>
      </React.Fragment>
    )
  };

  return (
    <List header="Saved Formulas" items={formulas} itemRender={itemRender}></List>
  );
}