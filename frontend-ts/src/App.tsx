import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@/ProtectedRoute';
import IndexPage from '@/pages/index';
import SignupPage from '@/pages/signupPage';
import LoginPage from '@/pages/loginPage';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
        <Route element={<ProtectedRoute />} path="/">
          <Route element={<IndexPage />} path="/" />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
