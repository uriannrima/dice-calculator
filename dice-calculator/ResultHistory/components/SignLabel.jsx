import React from 'react';

export default function SignLabel({ sign = '=' }) {
  return (
    <label className="SignLabel">{sign}</label>
  );
}