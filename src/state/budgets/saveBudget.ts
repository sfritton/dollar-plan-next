import { AppThunk } from '../types';
import { Budget } from '../../types/budget';
import makeGetModified from '../../util/makeGetModified';
import { StateGroup } from '../groups/types';
import { StateCategory } from '../categories/types';
import SaveBudget from '../../services/SaveBudget';
import slice from './slice';
import groupsSlice from '../groups/slice';
import categoriesSlice from '../categories/slice';

function saveBudget(id: Budget.Id): AppThunk {
  const getModified = makeGetModified(id);
  return async (dispatch, getState) => {
    const state = getState();

    const groups = Object.values(state.groups).filter(getModified) as StateGroup[];
    const categories = Object.values(state.categories).filter(getModified) as StateCategory[];

    try {
      const budget = await SaveBudget({ id, groups, categories });

      dispatch(groupsSlice.actions.resetGroups());
      dispatch(categoriesSlice.actions.resetCategories());

      dispatch(slice.actions.addBudgetSuccess({ id, budget }));
    } catch (error) {
      dispatch(slice.actions.addBudgetFailure({ id, error: error.message }));
    }
  };
}

export default saveBudget;
