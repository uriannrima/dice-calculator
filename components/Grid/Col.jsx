import React from 'react';

export default function Col({ tag: Tag, children }) {
  return <Tag>{children}</Tag>;
};

Col.defaultProps = {
  tag: "ion-col"
};