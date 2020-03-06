import FetchBudget from '../../services/FetchBudget';
import slice from './slice';
import { AppThunk, Status } from '../types';

function fetchBudget(id: string): AppThunk {
  return async (dispatch, getState) => {
    const { status } = getState().budgets.idMap[id] || {};

    // prevent duplicate calls
    if (status === Status.LOADING) return;

    dispatch(slice.actions.addBudgetPending(id));

    try {
      const budget = await FetchBudget(id);

      dispatch(slice.actions.addBudgetSuccess({ id, budget }));
    } catch (error) {
      dispatch(slice.actions.addBudgetFailure({ id, error: error.message }));
    }
  };
}

export default fetchBudget;
