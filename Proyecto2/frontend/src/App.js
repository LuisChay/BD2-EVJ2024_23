import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar.js';
import {Historial} from './Components/Historial';
import Carrito from './Components/Carrito.js';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Historial />} />
          <Route path="/Historial" element={<Historial />} />
          <Route path="/Carrito" element={<Carrito />} />
      </Routes>
    </>
    
  );
}

export default App;