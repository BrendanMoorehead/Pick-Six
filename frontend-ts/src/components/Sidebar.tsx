import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroups } from '@/features/groups/groupSlice';

const Sidebar = () => {
  const groups = useSelector(selectGroups);
  return (
    <div>
      {groups.map((group) => {
        return <div key={group.id}>{group.group_name}</div>;
      })}
    </div>
  );
};

export default Sidebar;
