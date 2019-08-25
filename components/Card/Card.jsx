import React from 'react';

export default function Card({ tag: Tag, children }) {
  return <Tag>{children}</Tag>;
};

Card.defaultProps = {
  tag: "ion-card"
};