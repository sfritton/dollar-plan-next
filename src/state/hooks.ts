import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

export function useAction<T extends AnyFunction>(actionCreator: T) {
  const dispatch = useDispatch();

  return useCallback(
    (...args: Parameters<T>) => {
      const action = actionCreator(...args);
      dispatch(action);
    },
    [dispatch, actionCreator],
  );
}
