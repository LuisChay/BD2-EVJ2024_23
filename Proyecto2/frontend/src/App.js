import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar.js';
import {Historial} from './Components/Historial';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Historial/>} />
          <Route path="/Historial" element={<Historial/>} />
      </Routes>
    </>
    
  );
}

export default App;