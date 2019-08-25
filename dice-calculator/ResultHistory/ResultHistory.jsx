import React from 'react';

import { Item, Badge, List } from '../../components';
import { DiceButton, SaveButton } from '../../components/Buttons';
import { StackWrapper } from './components';

export default function ResultHistory({
  history = [],
  onReroll = () => { },
  onSave = () => { },
}) {
  const itemRender = (historyItem, index) => {
    const { formulaStack, parsedFormulaStack, result } = historyItem;
    return (
      <React.Fragment>
        <StackWrapper stack={formulaStack} />
        <StackWrapper stack={parsedFormulaStack} />
        <Badge color="success">{result}</Badge>
        <div slot="end">
          <DiceButton onClick={() => onReroll(formulaStack)} />
          <SaveButton onClick={() => onSave(formulaStack)} />
        </div>
      </React.Fragment>
    );
  };

  return (
    <List header="Previous Rolls" items={history} itemRender={itemRender} />
  );
}
