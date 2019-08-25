import React from 'react';

export default function Row({ tag: Tag, children }) {
  return <Tag>{children}</Tag>;
};

Row.defaultProps = {
  tag: "ion-row"
};