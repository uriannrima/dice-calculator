import React from 'react';

export default function Text({ tag: Tag, children, ...rest }) {
  return (
    <Tag {...rest} >{children}</ Tag>
  );
}

Text.defaultProps = {
  tag: 'ion-text'
}