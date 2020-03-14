import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import budgetsSlice from '../budgets/slice';
import { StateGroup } from './types';

const initialState: Dictionary<string, StateGroup> = {};

export const name = 'groups' as const;

const groupsSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateGroupTitle: (state, action: PayloadAction<{ id: Budget.Id; title: string }>) => {
      const group = state[action.payload.id];

      if (!group) return;

      group.title = action.payload.title;
    },
    addCategory: (state, action: PayloadAction<{ id: Budget.Id; groupId: Budget.Id }>) => {
      const group = state[action.payload.groupId];

      if (!group) return;

      group.categoryIds = [...group.categoryIds, action.payload.id];
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
        ...budget.groups,
      };
    },
    [budgetsSlice.actions.addGroup.toString()]: (
      state,
      action: PayloadAction<{ budget_id: number; is_income: boolean; id: Budget.Id }>,
    ) => {
      state[action.payload.id] = {
        budget_id: action.payload.budget_id,
        is_income: action.payload.is_income,
        title: '',
        sort: 0,
        id: action.payload.id,
        isNew: true,
        categoryIds: [],
      };
    },
  },
});

export default groupsSlice;
