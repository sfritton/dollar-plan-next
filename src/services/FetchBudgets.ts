import { Budget } from '../types/budget';
import { fetchGet } from '../util/fetch';

async function FetchBudgets() {
  return await fetchGet<Budget.Budget[]>(
    `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/budgets`,
  );
}

export default FetchBudgets;
