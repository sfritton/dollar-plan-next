import { Budget } from '../types/budget';
import { fetchGet } from '../util/fetch';

async function SearchTransactions(searchTerm: string) {
  return await fetchGet<Budget.Transaction[]>(`/transactions/search/${searchTerm}`);
}

export default SearchTransactions;
