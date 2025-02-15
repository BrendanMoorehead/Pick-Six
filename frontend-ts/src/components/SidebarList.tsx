import { useSelector } from 'react-redux';
import { selectGroups } from '@/features/groups/groupSlice';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { BiPlusCircle, BiSolidGroup, BiSolidHome } from 'react-icons/bi';
import { Link } from 'react-router-dom';
//Sidebar documentation: https://www.npmjs.com/package/react-pro-sidebar
const SidebarList = () => {
  const groups = useSelector(selectGroups);
  return (
    <Sidebar className="h-full">
      <Menu>
        <MenuItem
          icon={<BiSolidHome />}
          // rootStyles={{ backgroundColor: '#76b587' }}
        >
          Home
        </MenuItem>
        <SubMenu label="Groups" defaultOpen icon={<BiSolidGroup />}>
          {groups.map((group) => {
            return <MenuItem key={group.id}> {group.group_name} </MenuItem>;
          })}
        </SubMenu>
        <MenuItem key="new-group" icon={<BiPlusCircle />}>
          New Group
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarList;
