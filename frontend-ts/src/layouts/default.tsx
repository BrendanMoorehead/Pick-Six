import Header from '@/components/Header';
import Sidebar from '@/components/SidebarList';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Spinner } from '@heroui/spinner';
import { Outlet } from 'react-router-dom';
export default function DefaultLayout() {
  const gamesloading = useSelector((state: RootState) => state.games.loading);
  const groupsloading = useSelector((state: RootState) => state.groups.loading);
  const teamsloading = useSelector((state: RootState) => state.teams.loading);
  return (
    <div className="relative flex h-screen flex-col">
      <Header />
      {gamesloading || groupsloading || teamsloading ? (
        <Spinner />
      ) : (
        <div className="h-full flex">
          <Sidebar />
          {/* {children} */}
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}
