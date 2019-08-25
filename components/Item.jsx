import React from 'react';

export default function Item({ tag: Tag, children, ...rest }) {
  return <Tag {...rest}>{children}</Tag>;
};

Item.defaultProps = {
  tag: "ion-item"
};