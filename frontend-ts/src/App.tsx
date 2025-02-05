import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import SignupPage from '@/pages/signupPage';
import LoginPage from '@/pages/loginPage';
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignupPage />} path="/signup" />
    </Routes>
  );
}

export default App;
