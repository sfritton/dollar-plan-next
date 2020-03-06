import React from 'react';
import Link from 'next/link';
import styles from './button.module.css';
import classNames from '../../util/classNames';

interface Props {
  href: string;
  small?: boolean;
  className?: string;
  onClick?: AnyFunction;
}

const LinkBase: React.FC<Props> = ({ children, small, href, className, onClick }) => (
  <Link href={href}>
    <a className={classNames({ [styles.small]: small }, 'btn', className)} onClick={onClick}>
      {children}
    </a>
  </Link>
);

export const LinkPrimary = LinkBase;

export const LinkSecondary: React.FC<Props> = ({ className, ...restProps }) => (
  <LinkBase {...restProps} className={classNames({}, styles.secondary, className)} />
);

export const LinkOutline: React.FC<Props> = ({ className, ...restProps }) => (
  <LinkBase {...restProps} className={classNames({}, styles.outline, className)} />
);
