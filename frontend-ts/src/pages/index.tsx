import DefaultLayout from '@/layouts/default';
import LogoutButton from '@/components/LogoutButton';
import CallButton from '@/components/CallButton';
import { supabase } from '../../supabaseClient';
import { createGroup, fetchGroups } from '../../api/groups';
import { getToken } from '../../services/auth';
import Sidebar from '@/components/SidebarList';
export default function IndexPage() {
  // const getToken = async () => {
  //   const { data: session } = await supabase.auth.getSession();
  //   return session?.session?.access_token || '';
  // };
  return (
    <DefaultLayout>
      <div className="w-4xl max-w-md">
        <LogoutButton />
        <CallButton
          getToken={getToken}
          apiCall={(data, token) =>
            createGroup({ group_name: 'Test Group 2' }, token)
          }
          buttonText="Create Group"
          requestData={{ group_name: 'Test Group 2' }}
          onSuccess={(response) => console.log(response)}
          onError={(error) => console.error('Error creating group', error)}
        />
        <CallButton
          getToken={getToken}
          apiCall={(data, token) => fetchGroups(token)}
          buttonText="Get Groups"
          onSuccess={(response) => console.log(response)}
          onError={(error) => console.error('Error getting groups', error)}
        />
      </div>
    </DefaultLayout>
  );
}
