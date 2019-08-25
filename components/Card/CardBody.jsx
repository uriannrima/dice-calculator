import React from 'react';

export default function CardBody({ tag: Tag, children }) {
  return <Tag>{children}</Tag>;
};

CardBody.defaultProps = {
  tag: "ion-card-body"
};