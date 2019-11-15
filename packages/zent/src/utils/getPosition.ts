import Popover, { IPositionFunction, IPositionFunctionProps } from '../popover';
import camelCase from 'camelcase';
import { Omit } from 'utility-types';

const { Position, ArrowPosition } = Popover;

const POSITIONS = [
  'left-top',
  'left-center',
  'left-bottom',
  'right-top',
  'right-center',
  'right-bottom',
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'auto-bottom-center',
  'auto-bottom-left',
  'auto-bottom-right',
  'auto-top-center',
  'auto-top-left',
  'auto-top-right',
] as const;

export type PopPositions = typeof POSITIONS[number];

type PopoverPositions = keyof Omit<typeof Position, 'INVISIBLE_POSITION'>;

const POSITION_MAP = {} as Record<PopPositions, PopoverPositions>;

for (let i = 0; i < POSITIONS.length; i += 1) {
  const name = POSITIONS[i];
  const pascal = camelCase(name, {
    pascalCase: true,
  }) as PopoverPositions;
  POSITION_MAP[name] = pascal;
}

function withFixUp(
  props: IPositionFunctionProps,
  pos: IPositionFunction,
  position: PopPositions
) {
  const p = pos(props);
  if (!POSITION_MAP[position]) {
    return p;
  }
  const name = p.className && p.className.substring(22);
  const fix = name && ArrowPosition[name];
  if (fix) {
    return fix(p, props);
  }
  return p;
}

export default function getPosition(
  position: PopPositions | IPositionFunction,
  centerArrow?: boolean
): IPositionFunction {
  if (typeof position === 'function') {
    return position;
  }

  let positionName = POSITION_MAP[position];
  let pos: IPositionFunction = Position[positionName];

  // Choose a fallback in case position is invalid
  if (!pos) {
    pos = Position.TopCenter;
    positionName = 'TopCenter';
  }

  if (centerArrow) {
    return props => withFixUp(props, pos, position);
  }

  return pos;
}
