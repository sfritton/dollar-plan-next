import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import budgetsSlice from '../budgets/slice';
import { getClosestToToday, SimpleDate } from '../../util/date';
import { StateTransaction } from './types';
import categoriesSlice from '../categories/slice';

const initialState: Dictionary<string, StateTransaction> = {};

export const name = 'transactions' as const;

const transactionsSlice = createSlice({
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
    updateDate: (state, action: PayloadAction<{ id: Budget.Id; date: number }>) => {
      const transaction = state[action.payload.id];
      if (!transaction) return;

      transaction.date = action.payload.date;
      transaction.isUpdated = true;
    },
    updateAmount: (state, action: PayloadAction<{ id: Budget.Id; amount: number }>) => {
      const transaction = state[action.payload.id];
      if (!transaction) return;

      transaction.amount = action.payload.amount;
      transaction.isUpdated = true;
    },
    updateCategory: (state, action: PayloadAction<{ id: Budget.Id; categoryId: Budget.Id }>) => {
      const transaction = state[action.payload.id];
      if (!transaction) return;

      transaction.category_id = action.payload.categoryId;
      transaction.isUpdated = true;
    },
    updateDescription: (state, action: PayloadAction<{ id: Budget.Id; description: string }>) => {
      const transaction = state[action.payload.id];
      if (!transaction) return;

      transaction.description = action.payload.description;
      transaction.isUpdated = true;
    },
    deleteTransaction: (state, action: PayloadAction<{ id: Budget.Id }>) => {
      state[action.payload.id] = undefined;
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
    [categoriesSlice.actions.createTransaction.toString()]: (
      state,
      action: PayloadAction<{
        id: Budget.Id;
        budgetId: Budget.Id;
        categoryId: Budget.Id;
        date: SimpleDate;
      }>,
    ) => {
      state[action.payload.id] = {
        id: action.payload.id,
        category_id: action.payload.categoryId,
        group_id: '',
        budget_id: action.payload.budgetId,
        description: '',
        date: getClosestToToday(action.payload.date).getDate(),
        amount: 0,
        isNew: true,
      };
    },
  },
});

export default transactionsSlice;
