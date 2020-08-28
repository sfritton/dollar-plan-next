import { Budget } from '../types/budget';
import { fetchPost } from '../util/fetch';
import { StateTransaction } from '../state/transactions/types';

interface SaveTransactionsBody {
  id: Budget.Id;
  transactions: (StateTransaction | { id: Budget.Id; isDeleted: true })[];
}

async function SaveTransactions(body: SaveTransactionsBody) {
  return await fetchPost<SaveTransactionsBody, Budget.BudgetResponse>('/transactions', body);
}

export default SaveTransactions;
