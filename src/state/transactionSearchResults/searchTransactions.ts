import SearchTransactions from '../../services/SearchTransactions';
import { AppThunk } from '../types';
import slice from './slice';

function searchTransactions(searchTerm: string): AppThunk {
  return async dispatch => {
    try {
      const transactions = await SearchTransactions(searchTerm);

      dispatch(slice.actions.searchTransactionsSuccess({ transactions }));
    } catch (error) {
      // do nothing
    }
  };
}

export default searchTransactions;
