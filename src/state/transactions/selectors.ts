import { AppState } from '../types';

export const makeGetTransaction = (id: number) => (state: AppState) => state.transactions[id];
