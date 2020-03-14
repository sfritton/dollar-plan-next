import { AppState } from '../types';

export const getIsAdjustingBudget = (state: AppState) => state.ui.isAdjustingBudget;

export const getIsEditingTransactions = (state: AppState) =>
  state.ui.categoryDrawer.isEditingTransactions;

export const getIsCategoryDrawerOpen = (state: AppState) => state.ui.categoryDrawer.isOpen;

export const getIsCategoryDrawerIncome = (state: AppState) => state.ui.categoryDrawer.isIncome;

export const getCategoryDrawerId = (state: AppState) => state.ui.categoryDrawer.id;

export const getIsTransactionDrawerOpen = (state: AppState) => state.ui.isTransactionDrawerOpen;
