import React from 'react';
import { ButtonPrimary } from '../../components/Button';
import IconSave from '../../icons/IconSave';
import { useAction } from '../../state/hooks';
import uiSlice from '../../state/ui/slice';
import styles from '../../components/Drawer/drawer.module.css';

const Footer: React.FC = () => {
  const closeDrawer = useAction(uiSlice.actions.closeTransactionDrawer);

  return (
    <ButtonPrimary className={styles.footerButton} onClick={closeDrawer}>
      <IconSave className={styles.footerIcon} /> Save
    </ButtonPrimary>
  );
};

export default Footer;
