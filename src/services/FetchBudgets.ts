import { Budget } from './types';
import { fetchGet } from '../util/fetch';

// TODO: real data
async function FetchBudgets() {
  // return await fetchGet<Budget.Budget[]>('http://localhost:3000/budgets');

  return await Promise.resolve([
    { id: 1, year: 2018, month: 5 },
    { id: 2, year: 2018, month: 4 },
    { id: 3, year: 2018, month: 3 },
    { id: 4, year: 2018, month: 2 },
    { id: 5, year: 2018, month: 1 },
  ]);
}

export default FetchBudgets;
