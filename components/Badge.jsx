import React from 'react';

export default function Badge({ tag: Tag, children, ...rest }) {
  return (
    <Tag {...rest} >{children}</ Tag>
  );
}

Badge.defaultProps = {
  tag: 'ion-badge'
}