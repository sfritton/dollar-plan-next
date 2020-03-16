import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import budgetsSlice from '../budgets/slice';
import { getClosestToToday, SimpleDate } from '../../util/date';
import { StateTransaction } from './types';

const initialState: Dictionary<string, StateTransaction> = {};

export const name = 'transactions' as const;

const groupsSlice = createSlice({
  name,
  initialState,
  reducers: {
    createIndependentTransaction: (
      state,
      action: PayloadAction<{ id: Budget.Id; budgetId: Budget.Id; date: SimpleDate }>,
    ) => {
      state[action.payload.id] = {
        id: action.payload.id,
        description: '',
        category_id: '',
        group_id: '',
        budget_id: action.payload.budgetId,
        date: getClosestToToday(action.payload.date).getDate(),
        amount: 0,
        isNew: true,
      };
    },
  },
  extraReducers: {
    [budgetsSlice.actions.addBudgetSuccess.toString()]: (
      state,
      action: PayloadAction<{
        id: string;
        budget: Budget.BudgetResponse;
      }>,
    ) => {
      const { budget } = action.payload;

      return {
        ...state,
        ...budget.transactions,
      };
    },
  },
});

export default groupsSlice;
