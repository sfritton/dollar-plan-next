import FetchBudgets from '../../services/FetchBudgets';
import slice from './slice';
import arrayToMap from '../../util/arrayToMap';
import { AppThunk, Status } from '../types';

function fetchBudgets(): AppThunk {
  return async (dispatch, getState) => {
    const status = getState().budgets.status;

    // prevent duplicate calls
    if (status === Status.LOADING) return;

    dispatch(slice.actions.addBudgetsPending());

    try {
      const budgets = await FetchBudgets();
      const budgetMap = arrayToMap(budgets.map(budget => ({ ...budget, status: Status.INIT as const })));

      dispatch(
        slice.actions.addBudgetsSuccess({
          ids: budgets.map(({ id }) => id),
          idMap: budgetMap,
        }),
      );
    } catch (error) {
      dispatch(slice.actions.addBudgetsFailure(error.message));
    }
  };
}

export default fetchBudgets;
