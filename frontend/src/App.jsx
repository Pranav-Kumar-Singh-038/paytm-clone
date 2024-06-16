import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenAtom } from './store/atoms/tokenAtom';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SendMoney from './pages/SendMoney';
import { RecoilRoot } from 'recoil';

function AppRoutes() {
  const token = useRecoilValue(tokenAtom);

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/signup" />} />
      <Route path="/dashboard"  element={token ? <Dashboard/> : <Navigate to="/signup" />}  />
      <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route path="/signin"  element={token ? <Navigate to="/dashboard" /> : <Signin />} />
      <Route path="/send" element={<SendMoney />} />
    </Routes>
  );
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
