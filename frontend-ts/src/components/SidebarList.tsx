import { useSelector } from 'react-redux';
import { selectGroups } from '@/features/groups/groupSlice';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { BiPlusCircle, BiSolidGroup, BiSolidHome } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
//Sidebar documentation: https://www.npmjs.com/package/react-pro-sidebar
const SidebarList = () => {
  const groups = useSelector(selectGroups);
  const location = useLocation();
  return (
    <Sidebar className="h-full">
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <MenuItem
          icon={<BiSolidHome />}
          component={<Link to="/" />}
          active={true}
        >
          Home
        </MenuItem>
        <SubMenu label="Groups" defaultOpen icon={<BiSolidGroup />}>
          {groups.map((group) => {
            return (
              <MenuItem
                key={group.id}
                component={<Link to={`/groups/${group.id}`} />}
                className={
                  location.pathname === `/groups/${group.id}` ? 'active' : ''
                }
              >
                {group.group_name}
              </MenuItem>
            );
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
