import { Budget } from '../types/budget';
import { fetchGet } from '../util/fetch';

async function FetchBudgets() {
  return await fetchGet<Budget.Budget[]>('http://localhost:3000/budgets');
}

export default FetchBudgets;
