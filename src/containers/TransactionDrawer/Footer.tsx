import React from 'react';
import { ButtonPrimary } from '../../components/Button';
import IconSave from '../../icons/IconSave';
import { useAction } from '../../state/hooks';
import uiSlice from '../../state/ui/slice';

const Footer: React.FC = () => {
  const closeDrawer = useAction(uiSlice.actions.closeTransactionDrawer);

  return (
    <ButtonPrimary className="budget-drawer--footer" onClick={closeDrawer}>
      <IconSave className="budget-drawer--footer-icon" /> Save
    </ButtonPrimary>
  );
};

export default Footer;
