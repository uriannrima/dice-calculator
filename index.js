import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles';

import { IonApp, IonContent, IonButton } from '@ionic/react';
import DiceCalculator from './dice-calculator';

class App extends Component {
  render() {
    return (
      <IonApp>
        <IonContent>
          <DiceCalculator />
        </IonContent>
      </IonApp>
    );
  }
}

render(<App />, document.getElementById('root'));
