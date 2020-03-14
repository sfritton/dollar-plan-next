import { Budget } from '../types/budget';
import { fetchPost } from '../util/fetch';
import { PostgresId } from '../queries/types';

async function CreateBudget(newBudget: Omit<Budget.Budget, 'id'>) {
  return await fetchPost<Omit<Budget.Budget, 'id'>, PostgresId>('/api/budgets/create', newBudget);
}

export default CreateBudget;
