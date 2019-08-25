import React from 'react';

import { StackTextItem } from './';

export default function StackText({ stack }) {
  return stack.map((item, index) => <StackTextItem item={item} key={index} />);
}