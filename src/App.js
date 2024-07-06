import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Auth from './pages/Auth';
import Welcome from './pages/Welcome';
import Reg from './pages/Reg';



function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reg" element={<Reg />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
