import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationsProvider } from '@salutejs/plasma-web';
import './App.css';
import Auth from './pages/Auth';
import Welcome from './pages/Welcome';
import Reg from './pages/Reg';
import DashBoard from './pages/DashBoard';


function App() {
  return (
    <NotificationsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </NotificationsProvider>
  );
}

export default App;
