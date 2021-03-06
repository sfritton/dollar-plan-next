import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import transactionsSlice from '../transactions/slice';

const initialState: Budget.Id[] = [];

export const name = 'transactionsToDelete' as const;

const transactionsToDeleteSlice = createSlice({
  name,
  initialState,
  reducers: {
    clear: () => [],
  },
  extraReducers: {
    [transactionsSlice.actions.deleteTransaction.toString()]: (
      state,
      action: PayloadAction<{ id: Budget.Id }>,
    ) => {
      // ignore temporary transactions
      if (isNaN(Number(action.payload.id))) return state;

      return [...state, action.payload.id];
    },
  },
});

export default transactionsToDeleteSlice;
