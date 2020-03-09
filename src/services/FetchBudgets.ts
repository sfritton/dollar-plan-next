import { Budget } from '../types/budget';
import { fetchGet } from '../util/fetch';

async function FetchBudgets() {
  return await fetchGet<Budget.Budget[]>('/api/budgets');
}

export default FetchBudgets;
