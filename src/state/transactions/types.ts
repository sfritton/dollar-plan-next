import { Budget } from '../../types/budget';

export interface StateTransaction extends Budget.Transaction {
  isNew?: boolean;
  isUpdated?: boolean;
}
