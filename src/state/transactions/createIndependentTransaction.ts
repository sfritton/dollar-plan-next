import slice from './slice';
import { AppThunk } from '../types';
import { Budget } from '../../types/budget';
import { SimpleDate } from '../../util/date';
import { makeGetCategoryOptions } from '../budgets/selectors';

interface Options {
  id: Budget.Id;
  budgetId: Budget.Id;
  date: SimpleDate;
}

function createIndependentTransaction({ id, budgetId, date }: Options): AppThunk {
  return (dispatch, getState) => {
    const state = getState();
    const groups = makeGetCategoryOptions(budgetId)(state);

    if (!groups || groups.length < 1) return;

    const categories = groups[0].categories;

    if (categories.length < 1) return;

    const categoryId = categories[0].id;

    dispatch(slice.actions.createIndependentTransaction({ id, budgetId, date, categoryId }));
  };
}

export default createIndependentTransaction;
