import { Budget } from '../types/budget';
import { fetchPost } from '../util/fetch';

interface CreateBudgetOptions extends Omit<Budget.Budget, 'id'> {
  isCopying?: boolean;
  prevBudgetId?: Budget.Id;
}

async function CreateBudget(options: CreateBudgetOptions) {
  return await fetchPost<Omit<Budget.Budget, 'id'>, { id: number }>('/budgets', options);
}

export default CreateBudget;
