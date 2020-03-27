import { AppThunk } from '../types';
import { Budget } from '../../types/budget';
import { StateGroup } from '../groups/types';
import { StateCategory } from '../categories/types';
import SaveBudget from '../../services/SaveBudget';
import slice from './slice';

const makeGetModified = (id: Budget.Id) => (item?: StateGroup | StateCategory) =>
  Number(item?.budget_id) === Number(id) && (item?.isNew || item?.isUpdated);

function saveBudget(id: Budget.Id): AppThunk {
  const getModified = makeGetModified(id);
  return async (dispatch, getState) => {
    const state = getState();

    const groups = Object.values(state.groups).filter(getModified) as StateGroup[];
    const categories = Object.values(state.categories).filter(getModified) as StateCategory[];

    console.log(state);
    console.log({ id, groups, categories });

    try {
      const budget = await SaveBudget({ id, groups, categories });

      dispatch(slice.actions.addBudgetSuccess({ id, budget }));
    } catch (error) {
      dispatch(slice.actions.addBudgetFailure({ id, error: error.message }));
    }
  };
}

export default saveBudget;
