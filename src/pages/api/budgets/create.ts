import { NextApiRequest, NextApiResponse } from 'next';
import { createBudget } from '../../../queries/createBudget';
import { ErrorResponse } from '../../../types/errorResponse';
import { ID } from '../../../queries/types';
import apiWrongMethod from '../../../util/apiWrongMethod';

export default async (req: NextApiRequest, res: NextApiResponse<ID | ErrorResponse>) => {
  if (req.method !== 'POST') return apiWrongMethod(req, res);

  try {
    const id = await createBudget(JSON.parse(req.body));
    return res.status(201).json(id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
