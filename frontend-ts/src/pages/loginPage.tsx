import LoginForm from '@/components/forms/LoginForm';
import { Link } from 'react-router-dom';
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center sm:py-12 lg:flex-row h-screen">
      <div className="hidden lg:flex lg:w-1/2 h-screen p-4">
        <div className=" h-full w-full ">
          <img
            className="rounded-3xl"
            src="https://static01.nyt.com/images/2022/11/10/sports/10nfl-scoring-3/10nfl-scoring-3-mediumSquareAt3X.jpg"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center py-12 h-screen justify-between ">
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
