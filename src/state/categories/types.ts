import { Budget } from '../../types/budget';

export interface StateCategory extends Budget.CategoryResponse {
  isNew?: boolean;
  isUpdated?: boolean;
}
