import React from 'react';
import './button.css';
import classNames from '../../util/classNames';
import { IconProps } from '../../icons/IconBase';

interface Props {
  onClick: AnyFunction;
  small?: boolean;
  className?: string;
}

const ButtonBase: React.FC<Props> = ({ children, small, onClick, className }) => (
  <button className={classNames({ 'btn-small': small }, 'btn', className)} onClick={onClick}>
    {children}
  </button>
);

export const ButtonPrimary = ButtonBase;

export const ButtonSecondary: React.FC<Props> = ({ className, ...restProps }) => (
  <ButtonBase {...restProps} className={classNames({}, 'btn-secondary', className)} />
);

export const ButtonOutline: React.FC<Props> = ({ className, ...restProps }) => (
  <ButtonBase {...restProps} className={classNames({}, 'btn-outline', className)} />
);

interface ButtonWithIconProps extends Props {
  Icon: React.ComponentType<IconProps>;
  label: string;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ className, Icon, label, ...restProps }) => (
  <ButtonBase {...restProps} className={classNames({}, 'btn-secondary btn-with-icon', className)}>
    <Icon size={32} className="btn-with-icon--icon" />
    <span className="btn-with-icon--label">{label}</span>
  </ButtonBase>
);

export const ButtonFloatingAction: React.FC<ButtonWithIconProps> = ({ className, Icon, label, ...restProps }) => (
  <ButtonBase {...restProps} className={classNames({}, 'btn-floating-action', className)}>
    <Icon />
    <div className="btn-floating-action--label">{label}</div>
  </ButtonBase>
);
