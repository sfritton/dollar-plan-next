import React, { useMemo } from 'react';
import { makeGetGroup } from '../../state/groups/selectors';
import { useSelector } from 'react-redux';
import GroupHeading from './GroupHeading';
import styles from './group.module.css';
import Category from '../Category';
import { getIsAdjustingBudget } from '../../state/ui/selectors';
import { CardClickable } from '../../components/Card';
import { useAction } from '../../state/hooks';
import groupsSlice from '../../state/groups/slice';
import uniqueId from '../../util/uniqueId';
import { Budget } from '../../types/budget';

interface Props {
  groupId: Budget.Id;
  noTitle?: boolean;
}

function Group(props: Props) {
  const { groupId, noTitle } = props;
  const getGroup = useMemo(() => makeGetGroup(groupId), [groupId]);

  const group = useSelector(getGroup);
  const isAdjustingBudget = useSelector(getIsAdjustingBudget);

  const addCategory = useAction(groupsSlice.actions.addCategory);

  if (!group) return null;

  return (
    <div className={styles.group}>
      {!noTitle && <GroupHeading title={group.title} id={groupId} />}
      <div className={styles.categoryCards}>
        {group.categoryIds.map(id => (
          <Category categoryId={id} isIncome={group.is_income} key={id} />
        ))}
        {isAdjustingBudget && (
          <CardClickable
            className={styles.addCategoryButton}
            onClick={() => addCategory({ id: uniqueId('category'), groupId })}
          >
            Add a category
          </CardClickable>
        )}
      </div>
    </div>
  );
}

export default Group;
