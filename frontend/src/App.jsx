import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            {/* </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
