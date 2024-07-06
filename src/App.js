import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationsProvider } from '@salutejs/plasma-web';
import './App.css';
import Auth from './pages/Auth';
import Welcome from './pages/Welcome';
import Reg from './pages/Reg';



function App() {
  return (
    <NotificationsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reg" element={<Reg />} />
        </Routes>
      </BrowserRouter>
    </NotificationsProvider>
  );
}

export default App;
