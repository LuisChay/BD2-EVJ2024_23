import React from 'react';
import { useState, useEffect } from 'react';

export function Resenia() {
  //libros del usaurio 
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comentario, setComentario] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedBook, setSelectedBook] = useState('');

  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  }

  //Publica la reseña
  const handleSubmit = async (e) => {
    console.log('Comentario:', comentario);
    console.log('Selected Book:', selectedBook);
    console.log("Rating: ", rating);
    // Aquí puedes agregar la lógica para enviar estos datos al servidor
    const currentDate = new Date();

    // Obtener y formatear la fecha
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch("http://localhost:5000/resenia", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: selectedBook,
          comentario: comentario,
          idUser: userId,
          date: formattedDate,
          rating: rating
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al enviar el idUser para reseña:', error);
      setError(error);
      setLoading(false);
    }
  };

  //Carga los libros que tenga el usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch("http://localhost:5000/get_books", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "idUser": userId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al enviar el idUser para mostrar libros:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Carga los libros para el select
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch("http://localhost:5000/get_books", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "idUser": userId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData2(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al enviar el idUser para el select:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const spacing = 90;
  const spacing2 = 10;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="container mb-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="input-group">
              <span className="input-group-text" id="inputGroup-sizing-default">Comentario</span>
              <textarea
                id="comentario"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                rows="3"
                value={comentario}
                onChange={handleComentarioChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="input-group">
              <span className="input-group-text" id="inputGroup-sizing-default">Rating</span>
              <input
                id="rating"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={rating}
                onChange={handleRatingChange}
              />
            </div>
          </div>
          <div className="col">
            <select className="form-select" aria-label="Default select example" onChange={handleSelectChange}>
              <option>Elegir libro</option>
              {data2.map((book, bookIndex) => (
                <option key={bookIndex} value={book.titulo}>{book.titulo}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Publicar</button>
          </div>
        </div>
      </div>

      <br /><br />

      {data.map((book, bookIndex) => (
        <div className="card" style={{ marginRight: spacing + 'em', marginBottom: '20px' }} key={bookIndex}>
          <img src={book.imagen} className="card-img-top" alt={book.titulo} />
          <div className="card-body">
            <h3 className="card-title">{book.titulo}</h3>
            <h3 className="card-title">{book.autor}</h3>
            <h5 className="card-text">Genero: {book.genero}</h5>
            <h5 className="card-text">Disponibilidad: {book.disponibilidad}</h5>
            <h5 className="card-text">Puntuacion: {book.puntuacion}</h5>
            <p className="card-text">{book.descripcion}</p>

            {book.reseñas.map((review, reviewIndex) => (
              <div className="card" style={{ marginRight: spacing2 + 'em', marginBottom: '10px' }} key={reviewIndex}>
                <div className="card-header">
                  {review.nombre}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{review.comentario}</li>
                  <li className="list-group-item">{new Date(review.fecha).toLocaleDateString()}</li>
                  <li className="list-group-item">Rating: {review.rating}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Resenia;
