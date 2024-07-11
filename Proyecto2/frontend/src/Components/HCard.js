import React, {useEffect, useState} from 'react'

export function HCard({bookId, quantity, price}){
  const [libro, setLibro] = useState();

  useEffect(() => {
    // Llamada a la API para obtener los libros
    fetch(`http://localhost:5000/libros/getlibro/${bookId}`)
      .then(response => response.json())
      .then(data => setLibro(data))
      .catch(error => console.error('Error fetching libro:', error));
  }, [bookId]);

  if (!libro) {
    return <div>Cargando...</div>;
  }

  return (
    
    <div className="card-body">
        <h5 className="card-title">{libro.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">Cantidad: {quantity}</h6>
        <p className="card-text">Precio: {price}</p>
    </div>
  );
}

export default HCard;
