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
      group.isUpdated = true;
    },
    addCategory: (
      state,
      action: PayloadAction<{ id: Budget.Id; groupId: Budget.Id; budgetId: Budget.Id }>,
    ) => {
      const group = state[action.payload.groupId];

      if (!group) return;

      group.categoryIds = [...group.categoryIds, action.payload.id];
    },
    resetGroups: state => {
      Object.keys(state).forEach(id => {
        const group = state[id];
        if (!group) return;

        group.isNew = false;
        group.isUpdated = false;
      });
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
      const maxSort = Math.max(...Object.values(state).map(group => group?.sort ?? 0), 0);

      state[action.payload.id] = {
        budget_id: action.payload.budget_id,
        is_income: action.payload.is_income,
        title: '',
        sort: maxSort + 1,
        id: action.payload.id,
        isNew: true,
        categoryIds: [],
      };
    },
  },
});

export default groupsSlice;
