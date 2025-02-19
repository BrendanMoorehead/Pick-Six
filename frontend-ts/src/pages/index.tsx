import DefaultLayout from '@/layouts/default';
import LogoutButton from '@/components/LogoutButton';
import CallButton from '@/components/CallButton';
import { supabase } from '../../supabaseClient';
import { createGroup, fetchGroups } from '../../api/groups';
import { getToken } from '../../services/auth';
import Sidebar from '@/components/SidebarList';
import PickRateCard from '@/components/PickRateCard';
import GroupPage from './groupPage';
export default function IndexPage() {
  // const getToken = async () => {
  //   const { data: session } = await supabase.auth.getSession();
  //   return session?.session?.access_token || '';
  // };
  return <p>Home</p>;
}
