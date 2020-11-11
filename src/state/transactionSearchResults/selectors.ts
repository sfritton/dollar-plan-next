import { AppState } from '../types';

export const getTransactionSearchStatus = (state: AppState) =>
  state.transactionSearchResults.status;
export const getTransactionSearchResults = (state: AppState) => state.transactionSearchResults.ids;
