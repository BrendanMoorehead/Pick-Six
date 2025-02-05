import SignupForm from '@/components/forms/SignupForm';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
export default function SignupPage() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col items-center sm:py-12 lg:flex-row h-screen">
      <div className="hidden lg:flex lg:w-1/2 h-screen p-4">
        <div className="h-full w-full">
          <img
            className="rounded-3xl w-full h-full object-cover"
            src="https://static01.nyt.com/images/2022/11/10/sports/10nfl-scoring-3/10nfl-scoring-3-mediumSquareAt3X.jpg"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center py-12 h-screen justify-between gap-y-12 ">
        <p className="text-2xl font-bold font-serif">PICKSIX</p>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-4xl font-bold font-serif">
              Create Your Account
            </h2>
            <p>Enter your details to get started</p>
          </div>
          <SignupForm />
        </div>
        <p>
          Already have an account?{' '}
          <Link className="font-bold" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
