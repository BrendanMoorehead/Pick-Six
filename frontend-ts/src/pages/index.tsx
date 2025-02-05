import LoginForm from '@/components/forms/LoginForm';
import DefaultLayout from '@/layouts/default';
import { Input } from '@heroui/input';
export default function IndexPage() {
  return (
    <DefaultLayout>
      <p>HELLO BAND</p>
      <Input />
      <LoginForm />
    </DefaultLayout>
  );
}
