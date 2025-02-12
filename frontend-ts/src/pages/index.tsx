import LoginForm from '@/components/forms/LoginForm';
import DefaultLayout from '@/layouts/default';
import { Input } from '@heroui/input';
import LogoutButton from '@/components/LogoutButton';
import CallButton from '@/components/CallButton';
import { supabase } from '../../supabaseClient';
import { createGroup } from '../../api/groups';
export default function IndexPage() {
  const getToken = async () => {
    const { data: session } = await supabase.auth.getSession();
    return session?.session?.access_token || '';
  };
  return (
    <DefaultLayout>
      <div className="w-4xl max-w-md">
        <LogoutButton />
        <CallButton
          getToken={getToken}
          apiCall={createGroup}
          buttonText="Create Group"
          requestData={{ group_name: 'Test Group 2' }}
          onSuccess={(response) => console.log(response)}
          onError={(error) => console.error('Error creating group', error)}
        />
      </div>
    </DefaultLayout>
  );
}
