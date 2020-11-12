import React from 'react';
import Link from 'next/link';
import styles from './nav.module.css';

interface Props {
  href?: string;
  onClick?: AnyFunction;
}

const NavLink: React.FC<Props> = ({ children, href, onClick }) =>
  href ? (
    <Link href={href}>
      <a className={styles.navLink}>{children}</a>
    </Link>
  ) : (
    <button className={styles.navLink} onClick={onClick}>
      {children}
    </button>
  );

export default NavLink;
