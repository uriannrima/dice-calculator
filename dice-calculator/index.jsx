import React from 'react';

import { DiceCalculatorContainer, SavedFormulasContainer } from './containers';
import DiceCalculator from './DiceCalculator';
import { ResultHistory } from './ResultHistory';
import { SaveFormulaModal } from './SaveFormulaModal';
import { SavedFormulas } from './SavedFormulas';

export default () => {
  return (
    <DiceCalculatorContainer>
      {({ history, ...data }) => (
        <React.Fragment>
          <DiceCalculator {...data} />
          <SavedFormulasContainer>
            {({
              savedFormulas,
              saveFormula,
              removeFormula,
              isModalOpen,
              openModal,
              closeModal,
              newItem
            }) => (
                <React.Fragment>
                  <ResultHistory
                    history={history}
                    onReroll={data.setFormulaAndCompute}
                    onSave={openModal}
                  />
                  <SavedFormulas
                    formulas={savedFormulas}
                    onReroll={data.setFormulaAndCompute}
                    onRemove={removeFormula}
                  />
                  <SaveFormulaModal
                    isOpen={isModalOpen}
                    onDidDismiss={closeModal}
                    formula={newItem}
                    onSaveFormula={saveFormula}
                  />
                </React.Fragment>
              )}
          </SavedFormulasContainer>
        </React.Fragment>
      )}
    </DiceCalculatorContainer>
  );
}