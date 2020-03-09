import { NextApiRequest, NextApiResponse } from 'next';
import { Budget } from '../../types/budget';
import { getAllBudgets } from '../../queries/getAllBudgets';

export default async (req: NextApiRequest, res: NextApiResponse<Budget.Budget[]>) => {
  try {
    const budgets = await getAllBudgets();
    console.log({ budgets });
    return res.json(budgets);
  } catch (error) {
    console.log({ error });
    res.status(500);
  }
};
