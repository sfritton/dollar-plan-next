import React from 'react';
import styles from './category.module.css';
import { getDollarString } from '../../util/currency';
import { InputText, InputDollar } from '../../components/Input';
import { useSelector } from 'react-redux';
import { getIsAdjustingBudget } from '../../state/ui/selectors';
import categoriesSlice from '../../state/categories/slice';
import { useAction } from '../../state/hooks';

interface Props {
  title: string;
  amount: number;
  id: number;
}

const CategoryHeading = ({ title, amount, id }: Props) => {
  const updateTitle = useAction(categoriesSlice.actions.updateCategoryTitle);
  const updateAmount = useAction(categoriesSlice.actions.updateCategoryAmount);

  const isAdjustingBudget = useSelector(getIsAdjustingBudget);

  return (
    <div className={styles.heading}>
      <div className={styles.title}>
        {isAdjustingBudget ? (
          <InputText
            className={styles.titleInput}
            label="Category name"
            value={title}
            onChange={e => updateTitle({ id, title: e.target.value })}
          />
        ) : (
          title
        )}
      </div>
      <div>
        {isAdjustingBudget ? (
          <InputDollar
            label="Amount"
            className={styles.notesInput}
            value={getDollarString(amount)}
            onChange={e => updateAmount({ id, amount: e.target.value })}
          />
        ) : (
          `$${getDollarString(amount)}`
        )}
      </div>
    </div>
  );
};

export default CategoryHeading;
