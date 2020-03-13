import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from '../types/errorResponse';

export default (req: NextApiRequest, res: NextApiResponse<ErrorResponse>) => {
  return res.status(400).json({ error: `${req.url} does not accept ${req.method} requests` });
};
