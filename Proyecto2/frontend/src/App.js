import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AdminLibros from './pages/adminLibros';
import Catalogo from './pages/catalogo';

import Navbar from "./components/Navbar.js";
import {Historial} from './components/Historial.js';
import Carrito from './components/Carrito.js';

import Cards from './components/CardsVerAutores.js';
import AddUser from "./components/AddUser.js";
import UserProfile from "./components/UserProfile.js";
import Login from "./components/Login.js";
import AuthorProfile from "./components/AuthorProfile.js";
import Reseña from "./components/Reseñas.js"
import Busqueda from "./components/Busqueda.js"

import './App.css';

function App() {
  return (
    <>
    <Busqueda/>
    
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