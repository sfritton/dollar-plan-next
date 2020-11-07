import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useAction } from '../state/hooks';
import uiSlice from '../state/ui/slice';
import { getIsAdjustingBudget } from '../state/ui/selectors';

const useIsAdjustingBudget = () => {
  const router = useRouter();

  const adjustingFromQuery = router.query.adjusting;
  const setIsAdjustingBudget = useAction(uiSlice.actions.setIsAdjustingBudget);
  const isAdjustingBudget = useSelector(getIsAdjustingBudget);

  useEffect(() => {
    if (adjustingFromQuery) setIsAdjustingBudget(true);
  }, [adjustingFromQuery, setIsAdjustingBudget]);

  return [isAdjustingBudget, setIsAdjustingBudget] as const;
};

export default useIsAdjustingBudget;
