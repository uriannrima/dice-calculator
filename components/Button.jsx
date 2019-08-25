import React from 'react';

export default function Button({ tag: Tag, children, onClick = () => { }, onLongClick, timeThreshold = 500, ...rest }) {
  let startTime = 0;
  let intervalId = -1;
  const onMouseDown = ({ type }) => {
    startTime = new Date().getTime();
    intervalId = setTimeout(() => {
      clearInterval(intervalId);
      onLongClick();
    }, timeThreshold);
  };

  const onMouseUp = () => {
    if (intervalId) {
      clearInterval(intervalId);
      onClick();
    }
  };

  return (
    <Tag onMouseDown={onMouseDown} onMouseUp={onMouseUp} {...rest}>
      {children}
    </Tag>
  );
};

Button.defaultProps = {
  tag: "ion-button"
};