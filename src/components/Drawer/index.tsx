import React, { useEffect, useRef } from 'react';
import classNames from '../../util/classNames';
import styles from './drawer.module.css';
import Layout from '../Layout';
import IconClose from '../../icons/IconClose';
import { ButtonWithIcon } from '../Button';

function useOnClickOutside<T extends HTMLElement>(handleClick: AnyFunction) {
  const ref = useRef<T>(null);

  // TODO: fix the type
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClick(event);
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside);
    };
  });

  return ref;
}

interface Props {
  isOpen: boolean;
  onClose: AnyFunction;
  title?: string;
  side?: 'left' | 'right';
  Footer?: React.ComponentType;
}

const Drawer: React.FC<Props> = ({ children, isOpen, onClose, title, side = 'right', Footer }) => {
  function handleClickOutside() {
    if (!isOpen) return;

    onClose();
  }

  const drawerRef = useOnClickOutside<HTMLDivElement>(handleClickOutside);

  return (
    <div className={classNames({ [styles.backgroundOpen]: isOpen }, styles.background)}>
      <Layout.Grid
        innerRef={drawerRef}
        className={classNames(
          { [styles.drawerOpen]: isOpen, [styles.drawerLeft]: side === 'left' },
          styles.drawer,
        )}
      >
        <Layout.Header className={styles.header}>
          {title && <h2>{title}</h2>}
          <ButtonWithIcon Icon={IconClose} label="Cancel" onClick={onClose} />
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
        {Footer && (
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        )}
      </Layout.Grid>
    </div>
  );
};

export default Drawer;
