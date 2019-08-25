import React from 'react';

export default function Label({ tag: Tag, children, ...rest }) {
  return (
    <Tag {...rest} >{children}</ Tag>
  );
}

Label.defaultProps = {
  tag: 'ion-label'
}