import { Budget } from './types';
import { fetchGet } from '../util/fetch';

async function FetchBudgets() {
  return await fetchGet<Budget.Budget[]>('/api/budgets');
}

export default FetchBudgets;
