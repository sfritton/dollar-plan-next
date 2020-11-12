import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import { Status } from '../types';

const initialState = {
  ids: [] as Budget.Id[],
  status: Status.INIT,
};

export const name = 'transactionSearchResults' as const;

const transactionSearchResultsSlice = createSlice({
  name,
  initialState,
  reducers: {
    searchTransactionsPending: state => ({ ...state, status: Status.LOADING }),
    searchTransactionsSuccess: (
      state,
      action: PayloadAction<{ transactions: Budget.Transaction[] }>,
    ) => ({ ids: action.payload.transactions.map(({ id }) => id), status: Status.SUCCESS }),
    searchTransactionsFailure: state => ({ ...state, status: Status.FAILURE }),
  },
});

export default transactionSearchResultsSlice;
