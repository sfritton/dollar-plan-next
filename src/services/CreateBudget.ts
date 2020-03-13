import { Budget } from '../types/budget';
import { fetchPost } from '../util/fetch';
import { ID } from '../queries/types';

async function CreateBudget(newBudget: Omit<Budget.Budget, 'id'>) {
  return await fetchPost<Omit<Budget.Budget, 'id'>, ID>('/api/budgets/create', newBudget);
}

export default CreateBudget;
