
import React from 'react';

export default function Icon({ tag: Tag, icon, name, children, ...rest }) {
  if (name) {
    return <ion-icon name={name} {...rest}></ion-icon>;
  }
  return <Tag className={icon} {...rest}>{children}</Tag>;
};

Icon.defaultProps = {
  tag: "i"
};