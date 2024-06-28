import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AdminLibros from './pages/adminLibros';
import Catalogo from './pages/catalogo';

import Navbar from "./Components/Navbar.js";
import {Historial} from './Components/Historial.js';
import Carrito from './Components/Carrito.js';

import Cards from './Components/CardsVerAutores.js';
import AddUser from "./Components/AddUser.js";
import UserProfile from "./Components/UserProfile.js";
import Login from "./Components/Login.js";
import AuthorProfile from "./Components/AuthorProfile.js";
import Reseña from "./Components/Reseñas.js"
import Busqueda from "./Components/Busqueda.js"

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