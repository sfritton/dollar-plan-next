import React from 'react';
import styles from './button.module.css';
import classNames from '../../util/classNames';
import { IconProps } from '../../icons/IconBase';

interface Props {
  onClick: AnyFunction;
  small?: boolean;
  className?: string;
}

const ButtonBase: React.FC<Props> = ({ children, small, onClick, className }) => (
  <button
    className={classNames({ [styles.small]: small }, styles.base, className)}
    onClick={onClick}
  >
    {children}
  </button>
);

export const ButtonPrimary = ButtonBase;

export const ButtonSecondary: React.FC<Props> = ({ className, ...restProps }) => (
  <ButtonBase {...restProps} className={classNames(styles.secondary, className)} />
);

export const ButtonOutline: React.FC<Props> = ({ className, ...restProps }) => (
  <ButtonBase {...restProps} className={classNames(styles.outline, className)} />
);

interface ButtonWithIconProps extends Props {
  Icon: React.ComponentType<IconProps>;
  label: string;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  className,
  Icon,
  label,
  ...restProps
}) => (
  <ButtonBase {...restProps} className={classNames(styles.secondary, styles.withIcon, className)}>
    <Icon size={32} className={styles.icon} />
    <span className={styles.label}>{label}</span>
  </ButtonBase>
);

interface ButtonFloatingActionProps extends ButtonWithIconProps {
  side?: 'left' | 'right';
}

export const ButtonFloatingAction: React.FC<ButtonFloatingActionProps> = ({
  className,
  Icon,
  label,
  side = 'right',
  ...restProps
}) => (
  <ButtonBase {...restProps} className={classNames(styles[side], styles.floatingAction, className)}>
    <Icon />
    <div className={styles.floatingActionLabel}>{label}</div>
  </ButtonBase>
);
