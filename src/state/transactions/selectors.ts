import { AppState } from '../types';
import { Budget } from '../../types/budget';

export const makeGetTransaction = (id: Budget.Id) => (state: AppState) => state.transactions[id];
