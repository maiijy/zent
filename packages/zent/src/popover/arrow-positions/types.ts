import { IPopoverPosition, IPositionFunctionProps } from '../index';

// FIXME: these values and css variables in pop.scss are interrelated
const ARROW_OFFSET_H = 15;
const ARROW_OFFSET_V = 9;

/**
 * 4√2
 */
const ARROW_WIDTH_HALF = 5.657;

interface IFixUpFunction {
  (position: IPopoverPosition, props: IPositionFunctionProps): IPopoverPosition;
}

export { IFixUpFunction, ARROW_OFFSET_H, ARROW_OFFSET_V, ARROW_WIDTH_HALF };
