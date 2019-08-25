import React from 'react';

import { StackTransformer } from '../components'
import { Card, CardBody } from '../components/Card'
import { FormulaField, ResultField } from './components/fields';
import { DicePad } from './components';

export default function DiceCalculator(props) {
  const {
    formula,
    updateFormula,
    clearFormula,
    dicePadData,
    formulaResult
  } = props;
  const { result, error, parsedFormulaStack } = formulaResult;

  return (
    <Card>
      <CardBody>
        <FormulaField formula={formula} error={error} />
        <StackTransformer stack={parsedFormulaStack}>{
          (parsedFormula) => <ResultField parsedFormula={parsedFormula} result={result} />
        }</StackTransformer>
        <DicePad
          dicePad={dicePadData}
          onClick={updateFormula}
          onLongClick={clearFormula}
        />
      </CardBody>
    </Card>
  );
}