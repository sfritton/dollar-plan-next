import React from 'react';
import styles from './layout.module.css';
import classNames from '../../util/classNames';

interface Props {
  className?: string;
  innerRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const Grid: React.FC<Props> = ({ children, className, innerRef }) => (
  <div ref={innerRef} className={classNames(styles.grid, className)}>
    {children}
  </div>
);

const Header: React.FC<Props> = ({ children, className, innerRef }) => (
  <div ref={innerRef} className={classNames(styles.header, className)}>
    {children}
  </div>
);

const Content: React.FC<Props> = ({ children, className, innerRef }) => (
  <div ref={innerRef} className={classNames(styles.content, className)}>
    {children}
  </div>
);

const Footer: React.FC<Props> = ({ children, className, innerRef }) => (
  <div ref={innerRef} className={classNames(styles.footer, className)}>
    {children}
  </div>
);

const Layout = {
  Grid,
  Header,
  Content,
  Footer,
};

export default Layout;
