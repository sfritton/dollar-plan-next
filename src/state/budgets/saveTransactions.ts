import { Budget } from '../../types/budget';
import { AppThunk } from '../types';
import makeGetModified from '../../util/makeGetModified';
import SaveTransactions from '../../services/SaveTransactions';
import { StateTransaction } from '../transactions/types';
import slice from './slice';
import { makeGetCategory } from '../categories/selectors';
import transactionsToDeleteSlice from '../transactionsToDelete/slice';

function saveTransactions(id: Budget.Id): AppThunk {
  const getModified = makeGetModified(id);

  return async (dispatch, getState) => {
    const state = getState();

    const modifiedTransactions = Object.values(state.transactions).filter(
      getModified,
    ) as StateTransaction[];

    const deletedTransactions = state.transactionsToDelete.map(id => ({
      id,
      isDeleted: true as const,
    }));

    const transactions = [
      ...modifiedTransactions.map(transaction => ({
        ...transaction,
        group_id: makeGetCategory(transaction.category_id)(state)?.group_id ?? '',
      })),
      ...deletedTransactions,
    ];

    try {
      const budget = await SaveTransactions({ id, transactions });

      dispatch(transactionsToDeleteSlice.actions.clear());
      dispatch(slice.actions.addBudgetSuccess({ id, budget }));
    } catch (error) {
      dispatch(slice.actions.addBudgetFailure({ id, error: error.message }));
    }
  };
}

export default saveTransactions;
