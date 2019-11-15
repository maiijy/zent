import { IPopoverPosition, IPositionFunctionProps } from '../index';

import { ARROW_OFFSET_V, ARROW_WIDTH_HALF, IFixUpFunction } from './types';

export const LeftTop: IFixUpFunction = (
  position: IPopoverPosition,
  props: IPositionFunctionProps
) => {
  const { style } = position;
  if (typeof style.top === 'number') {
    style.top +=
      props.anchorRect.height / 2 - ARROW_OFFSET_V - ARROW_WIDTH_HALF;
  }
  return position;
};
