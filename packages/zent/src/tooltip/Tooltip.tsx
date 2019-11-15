import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import noop from 'lodash-es/noop';

import Popover, {
  IPositionFunction,
  IPopoverClickTriggerChildProps,
  IPopoverClickTriggerProps,
  IPopoverTriggerProps,
  IPopoverHoverTriggerChildProps,
  IPopoverHoverTriggerProps,
  IPopoverFocusTriggerChildProps,
  IPopoverFocusTriggerProps,
} from '../popover';
import { exposePopover } from '../popover/withPopover';

import getPosition, { PopPositions } from '../utils/getPosition';

const { Trigger } = Popover;

export interface ITooltipNoneTriggerProps<Props extends object>
  extends IPopoverTriggerProps<Props>,
    ITooltipCommonProps {
  trigger: 'none';
}

export interface ITooltipClickTriggerProps<
  Props extends IPopoverClickTriggerChildProps
> extends IPopoverClickTriggerProps<Props>, ITooltipCommonProps {
  trigger: 'click';
}

export interface ITooltipHoverTriggerProps<
  Props extends IPopoverHoverTriggerChildProps
> extends IPopoverHoverTriggerProps<Props>, ITooltipCommonProps {
  trigger: 'hover';
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export interface ITooltipFocusTriggerProps<
  Props extends IPopoverFocusTriggerChildProps
> extends IPopoverFocusTriggerProps<Props>, ITooltipCommonProps {
  trigger: 'focus';
}

export interface ITooltipCommonProps {
  title: React.ReactNode;
  trigger?: 'none' | 'click' | 'hover' | 'focus';
  position: PopPositions | IPositionFunction;
  cushion?: number;
  centerArrow?: boolean;
  className?: string;
  visible?: boolean;
  containerSelector?: string;
  onVisibleChange?: (visible: boolean) => void;
}

export type ITooltipProps =
  | ITooltipNoneTriggerProps<any>
  | ITooltipClickTriggerProps<any>
  | ITooltipHoverTriggerProps<any>
  | ITooltipFocusTriggerProps<any>;

export interface ITooltipState {
  confirmPending: boolean;
  cancelPending: boolean;
}

export class Tooltip extends Component<ITooltipProps, ITooltipState> {
  static defaultProps = {
    trigger: 'hover',
    position: 'top-center',
    cushion: 10,
    type: 'primary',
    mouseLeaveDelay: 200,
    mouseEnterDelay: 200,
    containerSelector: 'body',
  };

  static withPop = exposePopover('pop');

  private popoverRef = React.createRef<Popover>();
  private isUnmounted = false;

  state = {
    confirmPending: false,
    cancelPending: false,
  };

  changePending = (
    key: keyof ITooltipState,
    pending: boolean,
    callback?: () => void
  ) => {
    if (this.isUnmounted) {
      return;
    }

    this.setState(
      {
        [key]: pending,
      } as any,
      callback
    );
  };

  adjustPosition() {
    const popover = this.popoverRef.current;
    if (popover) {
      popover.adjustPosition();
    }
  }

  getWrappedPopover() {
    return this.popoverRef.current;
  }

  renderTrigger() {
    const { props } = this;
    switch (props.trigger) {
      case 'click':
        return (
          <Trigger.Click closeOnClickOutside={props.closeOnClickOutside}>
            {props.children}
          </Trigger.Click>
        );
      case 'hover':
        return (
          <Trigger.Hover
            showDelay={props.mouseEnterDelay}
            hideDelay={props.mouseLeaveDelay}
          >
            {props.children}
          </Trigger.Hover>
        );
      case 'focus':
        return <Trigger.Focus>{props.children}</Trigger.Focus>;
      case 'none':
        return <Popover.Anchor>{props.children}</Popover.Anchor>;
      default:
        throw new Error('Pop trigger not assigned');
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const {
      className,
      trigger,
      visible,
      position,
      cushion,
      title,
      centerArrow,
      containerSelector,
    } = this.props;

    let { onVisibleChange } = this.props;
    if (trigger === 'none') {
      onVisibleChange = onVisibleChange || noop;
    }

    const { confirmPending, cancelPending } = this.state;
    const closePending = confirmPending || cancelPending;

    return (
      <Popover
        ref={this.popoverRef}
        visible={closePending ? true : visible}
        onVisibleChange={closePending ? noop : onVisibleChange}
        className={cx('zent-tooltip', className)}
        cushion={cushion}
        position={getPosition(position, centerArrow)}
        containerSelector={containerSelector}
      >
        {this.renderTrigger()}
        <Popover.Content>
          <div className="zent-tooltip-inner">{title}</div>
          <div className="zent-tooltip-arrow" />
        </Popover.Content>
      </Popover>
    );
  }
}

export default Tooltip;
