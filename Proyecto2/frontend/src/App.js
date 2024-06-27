import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AdminLibros from './pages/adminLibros';
import Catalogo from './pages/catalogo';
import Autores from './pages/adminAutores';

import './App.css';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/administrador/libros" element={<AdminLibros/>}/>
        <Route path="/catalogo" element={<Catalogo/>}/>
        <Route path="/autores" element={<Autores/>}/>
      </Routes>
    </Router>

    </>
  );
}

export default App;