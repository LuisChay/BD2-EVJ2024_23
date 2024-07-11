import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Busqueda() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comentario, setComentario] = useState('');
  
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedFilter(event.target.value);
  };


  const handleSubmit = async (e) => {
    console.log('Busqueda:', comentario);
    console.log('Selected Filter:', selectedFilter);
  
    try {
        const response = await fetch("http://localhost:5000/busqueda", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            valor: comentario,
            filtro: selectedFilter
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error al enviar el nombre:', error);
        setError(error);
        setLoading(false);
      }
   

    
  };

  const resetbooks = async (e) => {
    try {
        const response = await fetch("http://localhost:5000/libros/getlibros");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al enviar el nombre:', error);
        setError(error);
        setLoading(false);
      }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/libros/getlibros");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al enviar el nombre:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="container mb-4">
        <div className="row">
          <div className="col">
            <div className="input-group">
              <span className="input-group-text" id="inputGroup-sizing-default">Busqueda</span>
              <input
                id="busqueda"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={comentario}
                onChange={handleComentarioChange}
              />
            </div>
          </div>
          <div className="col">
            <select className="form-select" aria-label="Default select example" onChange={handleSelectChange}>
              <option>Elegir filtro</option>
              <option key="Titulo" value="Titulo">Titulo</option>
              <option key="Genero" value="Genero">Genero</option>
              <option key="Precio" value="Precio">Precio</option>
              <option key="Puntuacion" value="Puntuacion">Puntuacion</option>
              <option key="Autor" value="Autor">Autor</option>
            </select>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Buscar</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-secondary"onClick={resetbooks}>Quitar filtro</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {data.map((book, bookIndex) => (
            <div className="col-md-4 mb-4" key={bookIndex}>
              <div className="card h-100">
                <img src={book.imageUrl} className="card-img-top" alt={book.title} />
                <div className="card-body" id={book.title}>
                  <h3 className="card-title">{book.title}</h3>
                  <h5 className="card-title">Autor: {book.authorId.name}</h5>
                  <h5 className="card-text">Género: {book.genre}</h5>
                  <h5 className="card-text">Disponibilidad: {book.stock}</h5>
                  <h5 className="card-text">Puntuación: {book.averageRating}</h5>
                  <h5 className="card-text">Precio: {book.price}</h5>
                  <p className="card-text">{book.description}</p>
                  <center>
                    <button type="button" className="btn btn-primary" >Agregar al carrito</button>
                  </center>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Busqueda;
