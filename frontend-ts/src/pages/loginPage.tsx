import LoginForm from '@/components/forms/LoginForm';
import { Link } from 'react-router-dom';
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center sm:py-12 lg:flex-row h-screen">
      <div className="hidden lg:flex lg:w-1/2 h-screen p-2">
        <div className="bg-green-900 h-full w-full rounded-3xl"></div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center md:py-12 h-screen justify-between gap-y-12 ">
        <p className="text-2xl font-bold font-serif">PICKSIX</p>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-4xl font-bold font-serif">Welcome Back</h2>
            <p>Enter your email and password to access your account</p>
          </div>
          <LoginForm />
        </div>
        <p>
          Don't have an account?{' '}
          <Link className="font-bold" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
