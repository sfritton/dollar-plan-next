import React from 'react';
import { useSelector } from 'react-redux';
import { getDollarString } from '../../util/currency';
import {
  getIsCategoryDrawerOpen,
  getIsCategoryDrawerIncome,
  getCategoryDrawerId,
} from '../../state/ui/selectors';
import uiSlice from '../../state/ui/slice';
import Drawer from '../../components/Drawer';
import CategoryBalance from '../Category/CategoryBalance';
import Transaction from '../Transaction';
import { makeGetCategory, makeGetActualAmount } from '../../state/categories/selectors';
import Footer from './Footer';
import styles from './category-drawer.module.css';
import { useAction } from '../../state/hooks';

function CategoryDrawer() {
  const isOpen = useSelector(getIsCategoryDrawerOpen);
  const isIncome = useSelector(getIsCategoryDrawerIncome);
  const categoryId = useSelector(getCategoryDrawerId);
  const category = useSelector(makeGetCategory(categoryId || 0));
  const actualAmount = useSelector(makeGetActualAmount(categoryId || 0));

  const closeDrawer = useAction(uiSlice.actions.closeCategoryDrawer);

  const { title, transactionIds } = category || {};

  return (
    <Drawer
      title={title}
      isOpen={isOpen && Boolean(category)}
      onClose={closeDrawer}
      Footer={Footer}
    >
      {category && (
        <>
          <div className={styles.header}>
            <div className={styles.amountBlock}>
              <h3 className={styles.heading}>Planned amount</h3>
              <div className={styles.amount}>${getDollarString(category.planned_amount)}</div>
            </div>
            <CategoryBalance
              plannedAmount={category.planned_amount}
              actualAmount={actualAmount}
              isIncome={isIncome}
            />
            {category.notes && (
              <>
                <h3 className={styles.heading}>Notes</h3>
                <div className={styles.notes}>{category.notes}</div>
              </>
            )}
            <h3 className={styles.heading}>Transactions</h3>
          </div>
          <ul className={styles.transactions}>
            {transactionIds && transactionIds.map(id => <Transaction id={id} key={id} />)}
          </ul>
        </>
      )}
    </Drawer>
  );
}

export default CategoryDrawer;
