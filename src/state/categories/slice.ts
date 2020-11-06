import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import budgetsSlice from '../budgets/slice';
import groupsSlice from '../groups/slice';
import { SimpleDate } from '../../util/date';
import { StateCategory } from './types';

const initialState: Dictionary<string, StateCategory> = {};

export const name = 'categories' as const;

const categoriesSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateCategoryTitle: (state, action: PayloadAction<{ id: Budget.Id; title: string }>) => {
      const category = state[action.payload.id];

      if (!category) return;

      category.title = action.payload.title;
      category.isUpdated = true;
    },
    updateCategoryAmount: (state, action: PayloadAction<{ id: Budget.Id; amount: number }>) => {
      const category = state[action.payload.id];

      if (!category) return;

      category.planned_amount = action.payload.amount;
      category.isUpdated = true;
    },
    updateCategoryNotes: (state, action: PayloadAction<{ id: Budget.Id; notes: string }>) => {
      const category = state[action.payload.id];

      if (!category) return;

      category.notes = action.payload.notes;
      category.isUpdated = true;
    },
    resetCategories: state => {
      Object.keys(state).forEach(id => {
        const category = state[id];
        if (!category) return;

        category.isNew = false;
        category.isUpdated = false;
      });
    },
    createTransaction: (
      state,
      action: PayloadAction<{
        id: Budget.Id;
        budgetId: Budget.Id;
        categoryId: Budget.Id;
        date: SimpleDate;
      }>,
    ) => {
      const category = state[action.payload.categoryId];

      if (!category) return;

      category.transactionIds = [...category.transactionIds, action.payload.id];
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
    [groupsSlice.actions.addCategory.toString()]: (
      state,
      action: PayloadAction<{ id: Budget.Id; groupId: Budget.Id; budgetId: Budget.Id }>,
    ) => {
      const maxSort = Math.max(...Object.values(state).map(category => category?.sort ?? 0), 0);

      state[action.payload.id] = {
        isNew: true,
        id: action.payload.id,
        title: '',
        planned_amount: 0,
        actual_amount: 0,
        notes: '',
        sort: maxSort + 1,
        budget_id: action.payload.budgetId,
        group_id: action.payload.groupId,
        transactionIds: [],
      };
    },
  },
});

export default categoriesSlice;
