import { Budget } from '../../types/budget';

export interface StateGroup extends Budget.GroupResponse {
  isNew?: boolean;
  isUpdated?: boolean;
}
