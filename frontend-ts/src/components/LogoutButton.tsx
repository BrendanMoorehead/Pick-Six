import { Button } from '@heroui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '../../supabaseClient';
export default function LogoutButton() {
  const handlePress = () => {
    supabase.auth.signOut();
  };
  return <Button onPress={handlePress}>Logout</Button>;
}
