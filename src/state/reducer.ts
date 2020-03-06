import { combineReducers } from '@reduxjs/toolkit';
import uiSlice, { name as uiName } from './ui/slice';
import budgetsSlice, { name as budgetsName } from './budgets/slice';
import groupsSlice, { name as groupsName } from './groups/slice';
import categoriesSlice, { name as categoriesName } from './categories/slice';
import transactionsSlice, { name as transactionsName } from './transactions/slice';

export default combineReducers({
  [uiName]: uiSlice.reducer,
  [budgetsName]: budgetsSlice.reducer,
  [groupsName]: groupsSlice.reducer,
  [categoriesName]: categoriesSlice.reducer,
  [transactionsName]: transactionsSlice.reducer,
});
