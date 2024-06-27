import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AdminLibros from './pages/adminLibros';
import Catalogo from './pages/catalogo';
import Autores from './pages/adminAutores';

import './App.css';
import Navbar from './Components/Navbar.js';
import {Historial} from './Components/Historial';
import Carrito from './Components/Carrito.js';

function App() {
  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Historial />} />
          <Route path="/administrador/libros" element={<AdminLibros/>}/>
          <Route path="/catalogo" element={<Catalogo/>}/>
          <Route path="/autores" element={<Autores/>}/>
          <Route path="/Historial" element={<Historial />} />
          <Route path="/Carrito" element={<Carrito />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;