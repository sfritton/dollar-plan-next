import { Budget } from '../types/budget';
import { fetchGet } from '../util/fetch';

async function FetchBudgets() {
  return await fetchGet<Budget.Budget[]>('/budgets');
}

export default FetchBudgets;
