import React, { useState } from 'react';
import Head from 'next/head';
import { useMediaQuery } from 'beautiful-react-hooks';
import styles from './header.module.css';
import classNames from '../../util/classNames';
import { ButtonWithIcon } from '../../components/Button';
import IconMenu from '../../icons/IconMenu';
import Nav from './Nav';
import Drawer from '../../components/Drawer';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title, children }) => {
  const isMedium = useMediaQuery('(min-width: 475px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasSubheader = children || isMedium;

  return (
    <>
      <Head>
        <title>{title} | Dollar Plan</title>
      </Head>
      <header className={classNames({ [styles.withoutSubheader]: !hasSubheader }, styles.header)}>
        {!isMedium && (
          <ButtonWithIcon
            className={styles.menuButton}
            Icon={IconMenu}
            label="Menu"
            onClick={() => setIsMenuOpen(true)}
          />
        )}
        <h1 className={styles.title}>{title}</h1>
        {isMedium && children}
      </header>
      {hasSubheader && <div className={styles.subheader}>{isMedium ? <Nav /> : children}</div>}
      {!isMedium && (
        <Drawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} side="left" title="Menu">
          <Nav />
        </Drawer>
      )}
    </>
  );
};

export default Header;
