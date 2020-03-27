import { Budget } from '../types/budget';
import { fetchPost } from '../util/fetch';
import { StateTransaction } from '../state/transactions/types';

interface SaveTransactionsBody {
  id: Budget.Id;
  transactions: StateTransaction[];
}

async function SaveBudget(body: SaveTransactionsBody) {
  return await fetchPost<SaveTransactionsBody, Budget.BudgetResponse>(
    'http://localhost:3000/transactions',
    body,
  );
}

export default SaveBudget;
