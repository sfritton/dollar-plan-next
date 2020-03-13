import { Budget } from '../../types/budget';

export type GroupId = string | number;

export interface GroupState extends Omit<Budget.GroupResponse, 'id'> {
  id: GroupId;
  isNew?: boolean;
  isUpdated?: boolean;
}
