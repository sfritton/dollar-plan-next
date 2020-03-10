import React from 'react';
import IconAdd from '../../../icons/IconAdd';
import { LinkPrimary } from '../../../components/Button/Link';
import styles from './budget-drawer.module.css';

const Footer: React.FC = () => (
  <LinkPrimary href="/new-budget" className={styles.footer}>
    <IconAdd /> Create new budget
  </LinkPrimary>
);

export default Footer;
