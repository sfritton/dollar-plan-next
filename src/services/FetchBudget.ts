import { Budget } from '../types/budget';
import { fetchGet } from '../util/fetch';

async function FetchBudget(id: Budget.Id) {
  return await fetchGet<Budget.BudgetResponse>(`http://localhost:3000/budgets/${id}`);
}

export default FetchBudget;
