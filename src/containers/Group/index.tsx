import React, { useMemo } from 'react';
import { makeGetGroup } from '../../state/groups/selectors';
import { useSelector } from 'react-redux';
import GroupHeading from './GroupHeading';
import styles from './group.module.css';
import Category from '../Category';
import { getIsAdjustingBudget } from '../../state/ui/selectors';
import { CardClickable } from '../../components/Card';

interface Props {
  groupId: number;
  noTitle?: boolean;
}

function Group(props: Props) {
  const { groupId, noTitle } = props;
  const getGroup = useMemo(() => makeGetGroup(groupId), [groupId]);

  const group = useSelector(getGroup);
  const isAdjustingBudget = useSelector(getIsAdjustingBudget);

  if (!group) return null;

  return (
    <div className={styles.group}>
      {!noTitle && <GroupHeading title={group.title} id={groupId} />}
      <div className={styles.categoryCards}>
        {group.categoryIds.map(id => (
          <Category categoryId={id} isIncome={group.is_income} key={id} />
        ))}
        {isAdjustingBudget && (
          <CardClickable className={styles.addCategoryButton} onClick={() => {}}>
            Add a category
          </CardClickable>
        )}
      </div>
    </div>
  );
}

export default Group;
