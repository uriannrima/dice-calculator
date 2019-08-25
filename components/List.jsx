import React from 'react';

import { Card, CardBody, CardHeader } from './Card';
import { Item } from './';

export default function List({
  items = [],
  header = 'List',
  itemRender = (data, index) => { }
}) {
  if (!items.length) {
    return null;
  }

  const itemsToRender = items.map((item, index) => (
    <Item key={item.id || index}>
      {itemRender(item, index)}
    </Item>
  ));

  return (
    <Card>
      <CardHeader>{header}</CardHeader>
      <CardBody>
        {itemsToRender}
      </CardBody>
    </Card>
  );
}