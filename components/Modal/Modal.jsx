import React from 'react';

import {
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton
} from '@ionic/react';

export default function Modal({
  children,
  header = 'Modal',
  onClose = () => { },
  ...rest
}) {
  return (
    <IonModal {...rest}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{header}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={rest.onDidDismiss}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {children}
      </IonContent>
    </IonModal>
  );
}