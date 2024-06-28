import React, {useEffect, useState} from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

export function ElementoC ({bookId, cantidad, sumCantidad, resCantidad, eliminar}){
  const [libro, setLibro] = useState();
  const [autor, setAutor] = useState();

  useEffect(() => {
    // Llamada a la API para obtener los libros
    fetch(`http://localhost:5000/libros/getlibro/${bookId}`)
      .then(response => response.json())
      .then(data => setLibro(data))
      .catch(error => console.error('Error fetching libro:', error));
    
    const getAutor = async () => {
      try {
        const url = 'http://localhost:5000/author';
        const body = JSON.stringify({ authorId: libro.authorId });
        
        const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
        });
    
        if (!response.ok) {
        throw new Error('ERROR en la respuesta ' + response.statusText);
        }
    
        const data = await response.json();
        setAutor(data);
      } catch (error) {
        console.log(error);
      }
    };

    if(libro){
      getAutor();
    }
  }, [bookId, libro]);

  if (!libro || !autor) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="card" style={{width: "18rem"}}>
      <img src={libro.imageUrl} className="card-img-top" alt={libro.title} />
      <div className="card-body">
        <h5 className="card-title">{libro.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{autor.name}</h6>
        <p className="card-text">Precio: {libro.price}</p>
        <p className="card-text">Cantidad: {cantidad}</p>
        <div className='contenedor-iconos1'
        onClick={() => sumCantidad(bookId, cantidad+1)}>
          <FaPlus />
        </div>
        <div className='contenedor-iconos2'
        onClick={() => resCantidad(bookId, cantidad-1)}>
          <FaMinus />
        </div>
        <button type="button" className="btn btn-danger"
        onClick={() => eliminar(bookId)}>Eliminar</button>
      </div>
    </div>
  );
}

export default ElementoC;