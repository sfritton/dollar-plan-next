import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryDrawerState {
  isOpen: boolean;
  isEditingTransactions: boolean;
  id?: number;
  isIncome?: boolean;
}

interface UiState {
  isAdjustingBudget: boolean;
  isTransactionDrawerOpen: boolean;
  categoryDrawer: CategoryDrawerState;
}

const initialState: UiState = {
  isAdjustingBudget: false,
  isTransactionDrawerOpen: false,
  categoryDrawer: { isOpen: false, isEditingTransactions: false },
};
export const name = 'ui' as const;

const uiSlice = createSlice({
  name,
  initialState,
  reducers: {
    setIsAdjustingBudget: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isAdjustingBudget: action.payload,
    }),
    setIsEditingTransactions: (state, action: PayloadAction<boolean>) => {
      state.categoryDrawer.isEditingTransactions = action.payload;
    },
    openCategoryDrawer: (
      state,
      action: PayloadAction<Omit<CategoryDrawerState, 'isOpen' | 'isEditingTransactions'>>,
    ) => ({
      ...state,
      categoryDrawer: {
        ...action.payload,
        isOpen: true,
        isEditingTransactions: false,
      },
    }),
    closeCategoryDrawer: state => ({
      ...state,
      categoryDrawer: { isOpen: false, isEditingTransactions: false },
    }),
    openTransactionDrawer: state => ({
      ...state,
      isTransactionDrawerOpen: true,
    }),
    closeTransactionDrawer: state => ({
      ...state,
      isTransactionDrawerOpen: false,
    }),
  },
});

export default uiSlice;
