import React, { useState, useEffect } from 'react';

export default function Catalogo() {
    const [libros, setLibros] = useState([]);

    // Implementar busqueda y filtrado de libros

    useEffect(() => {
        // Llamada a la API para obtener los libros
        fetch('http://localhost:5000/libros/getlibros')
            .then(response => response.json())
            .then(data => setLibros(data))
            .catch(error => console.error('Error fetching libros:', error));
    }, []);

    // Handler para editar un libro específico
    const handleVistaLibro = (libroId) => {
        // Redirigir a una página para hacer las reseñas
        console.log('Editar libro:', libroId);
    };

    return (
        <div>
            <h1 className="text-center">Catalogo</h1>
            <div className="d-flex flex-wrap justify-content-around">
                {libros.map((libro) => (
                    <div key={libro._id} className="card m-2" style={{ width: '18rem' }}>
                        <img className="card-img-top img-thumbnail" src={libro.imageUrl} alt={libro.title} />
                        <div className="card-body">
                            <h5 className="card-title">{libro.title}</h5>
                            <p className="card-text">Autor: {libro.authorId.name}</p>
                            <p className="card-text">Descripción: {libro.description}</p>
                            <p className="card-text">Género: {libro.genre}</p>
                            <p className="card-text">
                                Fecha de publicación: {new Date(libro.publicationDate).toLocaleDateString()}
                            </p>
                            <p className="card-text">Precio: ${libro.price}</p>
                            <p className="card-text">Stock disponible: {libro.stock}</p>
                            <p className="card-text">Promedio de valoración: {libro.averageRating}</p>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-warning" onClick={() => handleVistaLibro(libro._id)}>
                                    Ver libro
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
