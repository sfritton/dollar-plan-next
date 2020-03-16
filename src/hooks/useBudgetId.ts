import { useRouter } from 'next/router';

const useBudgetId = () => {
  const router = useRouter();
  const rawId = router.query.id;

  if (!Array.isArray(rawId)) return rawId;

  if (rawId.length > 0) return rawId[0];

  return '';
};

export default useBudgetId;
