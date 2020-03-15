import React from 'react';
import { useSelector } from 'react-redux';
import { Budget } from '../../types/budget';
import { getIsAdjustingBudget } from '../../state/ui/selectors';
import { InputText } from '../../components/Input';
import { useAction } from '../../state/hooks';
import categoriesSlice from '../../state/categories/slice';
import styles from './category.module.css';

interface Props {
  notes: string;
  id: Budget.Id;
}

function CategoryNotes(props: Props) {
  const { notes, id } = props;

  const updateNotes = useAction(categoriesSlice.actions.updateCategoryNotes);
  const isAdjustingBudget = useSelector(getIsAdjustingBudget);

  if (isAdjustingBudget)
    return (
      <div className={styles.notes}>
        <InputText
          className={styles.notesInput}
          value={notes}
          onChange={e => updateNotes({ id, notes: e.target.value })}
          label="Notes"
        />
      </div>
    );

  if (!notes) return null;

  return <div className={styles.notes}>{notes}</div>;
}

export default CategoryNotes;
