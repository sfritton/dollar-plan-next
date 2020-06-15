import { Budget } from '../types/budget';
import { fetchGet } from '../util/fetch';

async function FetchBudget(id: Budget.Id) {
  return await fetchGet<Budget.BudgetResponse>(
    `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/budgets/${id}`,
  );
}

export default FetchBudget;
