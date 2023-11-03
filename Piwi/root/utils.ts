import React from 'react';
import _ from 'lodash';

export function getNodeType(node: React.ReactNode) {
  // _.get name from ReactMemo(React.forwardRef), React.forwardRef and plain function or class
  const type = _.get(
    node,
    'type.type.render.name',
    _.get(
      node,
      'type.render.name',
      _.get(node, 'type.name', _.get(node, 'type.type.name', null)),
    ),
  );
  return type as unknown as string | null;
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(r: number, g: number, b: number) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
