import { Budget } from '../types/budget';

interface Item {
  budget_id: Budget.Id;
  isNew?: boolean;
  isUpdated?: boolean;
}
const makeGetModified = (id: Budget.Id) => (item?: AtMinimum<Item>) =>
  Number(item?.budget_id) === Number(id) && (item?.isNew || item?.isUpdated);

export default makeGetModified;
