import LoginForm from '@/components/forms/LoginForm';
import DefaultLayout from '@/layouts/default';
import { Input } from '@heroui/input';
import LogoutButton from '@/components/LogoutButton';
export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="w-4xl max-w-md">
        <LogoutButton />
      </div>
    </DefaultLayout>
  );
}
