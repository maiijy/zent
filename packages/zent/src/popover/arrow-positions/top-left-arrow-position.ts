import { IPopoverPosition, IPositionFunctionProps } from '../index';

import { ARROW_OFFSET_H, ARROW_WIDTH_HALF, IFixUpFunction } from './types';

export const TopLeft: IFixUpFunction = (
  position: IPopoverPosition,
  props: IPositionFunctionProps
) => {
  const { style } = position;
  if (typeof style.left === 'number') {
    style.left +=
      props.anchorRect.width / 2 - ARROW_OFFSET_H - ARROW_WIDTH_HALF;
  }
  return position;
};
