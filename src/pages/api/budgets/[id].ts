import { NextApiRequest, NextApiResponse } from 'next';
import { Budget } from '../../../types/budget';
import { NOT_FOUND_MESSAGE } from '../../../queries/constants';
import { getBudgetById } from '../../../queries/getBudgetById';
import { ErrorResponse } from '../../../types/errorResponse';
import apiWrongMethod from '../../../util/apiWrongMethod';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Budget.BudgetResponse | ErrorResponse>,
) => {
  if (req.method !== 'GET') return apiWrongMethod(req, res);

  const id = req.query.id;

  if (Array.isArray(id)) {
    res.status(400).json({ error: `Invalid id: ${id}. Id must be a string.` });
    return;
  }

  try {
    const budget = await getBudgetById(id);

    return res.json(budget);
  } catch (error) {
    res.status(error?.message === NOT_FOUND_MESSAGE ? 404 : 500).json({ error: error.message });
  }
};
