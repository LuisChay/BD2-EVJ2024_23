import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AdminLibros from './pages/adminLibros';
import Catalogo from './pages/catalogo';

import './App.css';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/administrador/libros" element={<AdminLibros/>}/>
        <Route path="/catalogo" element={<Catalogo/>}/>
      </Routes>
    </Router>

    </>
  );
}

export default App;