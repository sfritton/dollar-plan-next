import { NextApiRequest, NextApiResponse } from 'next';
import { Budget } from '../../../types/budget';
import { getAllBudgets } from '../../../queries/getAllBudgets';
import { ErrorResponse } from '../../../types/errorResponse';
import apiWrongMethod from '../../../util/apiWrongMethod';

export default async (req: NextApiRequest, res: NextApiResponse<Budget.Budget[] | ErrorResponse>) => {
  if (req.method !== 'GET') return apiWrongMethod(req, res);

  try {
    const budgets = await getAllBudgets();
    return res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
