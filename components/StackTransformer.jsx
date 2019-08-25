import React from 'react';

import { stackToString } from '../stack';

export default function StackTransformer({
  children,
  stack,
  transformFunction = stackToString
}) {
  return children(Array.isArray(stack) ? transformFunction(stack) : '');
}