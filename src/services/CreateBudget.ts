import { Budget } from '../types/budget';
import { fetchPost } from '../util/fetch';

async function CreateBudget(newBudget: Omit<Budget.Budget, 'id'>) {
  return await fetchPost<Omit<Budget.Budget, 'id'>, Budget.BudgetResponse>('/api/budgets/create', newBudget);
}

export default CreateBudget;
