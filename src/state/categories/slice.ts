import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../services/types';
import budgetsSlice from '../budgets/slice';
import { getCentNumber, isValidAmount } from '../../util/currency';

const initialState: Dictionary<string, Budget.CategoryResponse> = {};

export const name = 'categories' as const;

const groupsSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateCategoryTitle: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const category = state[action.payload.id];

      if (!category) return;

      category.title = action.payload.title;
    },
    updateCategoryAmount: (state, action: PayloadAction<{ id: number; amount: string }>) => {
      if (!isValidAmount(action.payload.amount)) return;

      const category = state[action.payload.id];

      if (!category) return;

      const newAmount = getCentNumber(action.payload.amount);

      category.planned_amount = newAmount;
    },
    updateCategoryNotes: (state, action: PayloadAction<{ id: number; notes: string }>) => {
      const category = state[action.payload.id];

      if (!category) return;

      category.notes = action.payload.notes;
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
        ...budget.categories,
      };
    },
  },
});

export default groupsSlice;
