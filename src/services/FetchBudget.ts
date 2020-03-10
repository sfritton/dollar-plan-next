import { Budget } from '../types/budget';
import { fetchGet } from '../util/fetch';

async function FetchBudget(id: string) {
  return await fetchGet<Budget.BudgetResponse>(`/api/budgets/${id}`);
}

export default FetchBudget;
