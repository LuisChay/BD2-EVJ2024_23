import {Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar(){
    return(
    <>
        <nav className="nav">
          <Link to="/" className="site-title">
            Proyecto2 BD2
          </Link>
          <ul>
            <CustomLink to="/Historial">Historial de Pedidos</CustomLink>
            <CustomLink to="/Carrito">Carrito</CustomLink>
            
            
            <CustomLink to="/CardsAutores">Autores</CustomLink>
            <CustomLink to="/Registro">Registrar</CustomLink>
            <CustomLink to="/Perfil">Perfil</CustomLink>
            <CustomLink to="/Login">Login</CustomLink>

          </ul>
        </nav>
    </>
    )
    
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}