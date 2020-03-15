import React from 'react';
import IconAdd from '../../../icons/IconAdd';
import { LinkPrimary } from '../../../components/Button/Link';
import styles from '../../../components/Drawer/drawer.module.css';

const Footer: React.FC = () => (
  <LinkPrimary href="/new-budget" className={styles.footerButton}>
    <IconAdd className={styles.footerIcon} /> Create new budget
  </LinkPrimary>
);

export default Footer;
