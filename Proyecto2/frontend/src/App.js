import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AdminLibros from './pages/adminLibros';
import Catalogo from './pages/catalogo';
import Autores from './pages/adminAutores';

import './App.css';
import Navbar from "./components/Navbar.js";
import {Historial} from './components/Historial';
import Carrito from './components/Carrito.js';

import Cards from './components/CardsVerAutores.js';
import AddUser from "./components/AddUser.js";
import UserProfile from "./components/UserProfile.js";
import Login from "./components/Login.js";
import AuthorProfile from "./components/AuthorProfile.js";
import HistorialCompras from "./components/HistorialCompras.js";

function App() {
  return (
    <>
      <Navbar/>
     
        <Routes>
          <Route path="/" element={<Historial />} />
          <Route path="/administrador/libros" element={<AdminLibros/>}/>
          <Route path="/catalogo" element={<Catalogo/>}/>
          <Route path="/autores" element={<Autores/>}/>
          <Route path="/Historial" element={<Historial />} />
          <Route path="/HistorialCompras" element={<HistorialCompras />} />
          <Route path="/Carrito" element={<Carrito />} />
          
          <Route path="/CardsAutores" element={<Cards/>} />
          <Route path="/Registro" element={<AddUser/>} />
          <Route path="/Perfil" element={<UserProfile/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path='/AuthorProfile/:authorId' element={<AuthorProfile/>}/>

        </Routes>
      
    </>
  );
}

export default App;