import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@/ProtectedRoute';
import IndexPage from '@/pages/index';
import SignupPage from '@/pages/signupPage';
import LoginPage from '@/pages/loginPage';
import { AuthProvider } from '@/contexts/AuthContext';
import DefaultLayout from './layouts/default';
import GroupPage from './pages/groupPage';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DefaultLayout />}>
            <Route element={<IndexPage />} path="/" />
            <Route path="groups/:id" element={<GroupPage />} />
          </Route>
        </Route>
        <Route path="*" element={<p>404 - Page Not Found</p>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
