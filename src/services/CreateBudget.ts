import { Budget } from '../types/budget';
import { fetchPost } from '../util/fetch';

async function CreateBudget(newBudget: Omit<Budget.Budget, 'id'>) {
  return await fetchPost<Omit<Budget.Budget, 'id'>, { id: number }>(
    'http://localhost:3000/budgets',
    newBudget,
  );
}

export default CreateBudget;
