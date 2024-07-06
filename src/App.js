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
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Reg" element={<Reg />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
