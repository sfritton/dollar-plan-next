import { Budget } from '../types/budget';
import { fetchPut } from '../util/fetch';
import { StateGroup } from '../state/groups/types';
import { StateCategory } from '../state/categories/types';

interface PutRequestBody {
  id: Budget.Id;
  groups: StateGroup[];
  categories: StateCategory[];
}

async function SaveBudget(body: PutRequestBody) {
  return await fetchPut<PutRequestBody, Budget.BudgetResponse>('/budgets', body);
}

export default SaveBudget;
