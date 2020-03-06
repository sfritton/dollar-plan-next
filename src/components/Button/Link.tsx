import React from 'react';
import Link from 'next/link';
import './button.css';
import classNames from '../../util/classNames';

interface Props {
  to: string;
  small?: boolean;
  className?: string;
  onClick?: AnyFunction;
}

const LinkBase: React.FC<Props> = ({ children, small, to, className, onClick }) => (
  <Link href={to}>
    <a className={classNames({ 'btn-small': small }, 'btn', className)} onClick={onClick}>
      {children}
    </a>
  </Link>
);

export const LinkPrimary = LinkBase;

export const LinkSecondary: React.FC<Props> = ({ className, ...restProps }) => (
  <LinkBase {...restProps} className={`btn-secondary ${className}`} />
);

export const LinkOutline: React.FC<Props> = ({ className, ...restProps }) => (
  <LinkBase {...restProps} className={`btn-outline ${className}`} />
);
