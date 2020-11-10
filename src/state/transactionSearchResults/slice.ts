import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';

const initialState: Budget.Id[] = [];

export const name = 'transactionSearchResults' as const;

const transactionSearchResultsSlice = createSlice({
  name,
  initialState,
  reducers: {
    searchTransactionsSuccess: (
      state,
      action: PayloadAction<{ transactions: Budget.Transaction[] }>,
    ) => action.payload.transactions.map(({ id }) => id),
  },
});

export default transactionSearchResultsSlice;
