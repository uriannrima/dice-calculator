import React from 'react';

import { StackText, SignLabel } from './';

export default function StackWrapper({ stack }) {
  if (!stack || !stack.length) return null;

  return (
    <React.Fragment>
      <StackText stack={stack} />
      <SignLabel />
    </React.Fragment>
  );
}