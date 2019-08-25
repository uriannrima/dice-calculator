import React from 'react';

import { IconedButton } from './';

export default function TrashButton(props) {
  return (
    <IconedButton {...props} color="danger" name="trash" />
  );
}