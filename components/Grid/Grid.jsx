import React from 'react';

export default function Grid({ tag: Tag, children }) {
  const style = {
    '--ion-grid-column-padding': 0
  };
  return <Tag style={style}>{children}</Tag>;
};

Grid.defaultProps = {
  tag: "ion-grid"
};