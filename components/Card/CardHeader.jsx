import React from 'react';

export default function CardHeader({ tag: Tag, children }) {
  return <Tag>{children}</Tag>;
};

CardHeader.defaultProps = {
  tag: "ion-card-header"
};